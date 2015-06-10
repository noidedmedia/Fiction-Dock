##
# This controller manages the entire lifecycle of stories, as well as
# subscriptions on stories.
#
class StoriesController < ApplicationController
  ##
  # Use pundit for authorization
  include Pundit
  before_filter :authenticate_user!, except: [:show, :index]

  ##
  # Subscribe to this story. 
  # On a JSON request, it returns `true` if it worked, and `false` otherwise
  # On an HTML request, it kind of... just redirects
  #
  # The point is to do this with JSON
  def subscribe
    if current_user.subscriptions.where(story_id: params[:id]).first.nil?
      Subscription.create(story_id: params[:id],
                          user_id: current_user.id)
      respond_to do |format|
        format.html { redirect_to story_path(params[:id]) }
        format.json { render json: true }
      end
    else
      respond_to do |format|
        # TODO: fix this
        format.html { redirect_to story_path(params[:id]) }
        format.json { render json: false}
      end
    end
  end
  
  ##
  # use a DELETE to unsubscribe
  # Returns the success as a JSON
  def unsubscribe
    s = Subscription.where(story_id: params[:id],
                       user_id: current_user.id)
    respond_to do |format|
      if s.try(:destroy)
        format.html { redirect_to story_path(params[:id])}
        format.json { render json: true}
      else
        # TODO: Fix this
        format.html { redirect_to story_path(params[:id])}
        format.json { render json: false}
      end
    end
  end

  ##
  # See if the current_user is subscribed to this story
  # Returns a JSON response
  def subscribed
    if Subscription.where(story_id: params[:id], user_id: current_user.id)
      render json: true
    else
      render json: false
    end
  end

  ##
  # Get a list of all stories
  # TODO: paginate this
  def index
    @stories = Story.all.includes(:franchises)
  end

  ##
  # Display a story. The id needs to be in `params[:id]`
  def show
    @story = Story.find(params[:id])
  end

  ##
  # Display a form to create a new story.
  def new
    @story = Story.new(user: current_user)
  end

  ##
  # Actually create the new story.
  def create
    @story = Story.new(story_params)
    respond_to do |format|
      if @story.save
        format.html { redirect_to @story }
        format.json { render :show, status: :ok, location: @story}
      else
        format.html { render :edit}
        format.json { render json: @story.errors, status: :unprocessable_entity}
      end
    end
  end

  ##
  # Display a form to edit the story in `params[:id]`
  def edit 
    @story = Story.find(params[:id])
    authorize @story
  end

  ## 
  # Update the given story.
  def update
    @story = Story.find(params[:id])
    authorize @story
    logger.debug("Pepaired params: #{prepped_params}")
    respond_to do |format|
      if @story.update(prepped_params)
        format.html { redirect_to @story }
        format.json { render :show, status: :ok, location: @story }
      else
        format.html { render :edit }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  ##
  # Remove the given story.
  def destroy
    @story = Story.find(params[:id])
    authorize @story
    @story.destroy
    respond_to do |format|
      format.html { redirect_to "/stories" }
      format.json { render json: true }
    end
  end

  protected

  ##
  # Parameters to create a story. Has the following schema:
  #     story: {
  #       name: name,
  #       blurb: blurb,
  #       description: description,
  #       franchise_ids: [franchise_id],
  #       character_ids: [character_id],
  #       ships_attributes: [{
  #          id: ship_id,
  #          ship_characters_attributes: [{
  #            character_id: character_id
  #          }]
  #       }]
  def story_params
    params.require(:story)
      .permit(:name,
              :blurb,
              :description,
              :franchise_ids => [],
              :character_ids => [],
              ships_attributes: [:id, {
                ship_characters_attributes: [
                  :character_id
                ]}])
      .merge(user_id: current_user.id)
  end

  ##
  # Yes, this is evil.
  # Less evil than the hack this is used to be.
  #
  # Basically, Rails makes some sort of odd assumptions about how nested
  # attributes work. 
  # It will only destroy things if you explicitly tell it to.
  # We don't really want that——our request is going to update the request 
  # completely. 
  #
  # So we basically add all the _delete attributes it wants. 
  def prepped_params
    p = story_params
    logger.debug("Story params: #{p.to_yaml}")
    # To make my life easier, we just re-build the ship attributes from 
    # sratch every single time
    # TODO: Fix this, probably
    p["ships_attributes"] ||= {}
    p["ships_attributes"].each do |_, sa|
      logger.debug("-" * 80)
      logger.debug("sa is #{sa.to_yaml} (#{sa.class})")
      next unless id = sa["id"]
      # AR passes this as a hash of hashes where the key doesn't matter
      # Yeah
      #
      # So we just simulate that
      # Theoretically, if somebody has 120 characters in a ship, this may break
      # I sincerely hope this never happens, because damn, how would a
      # relationship involving that many people even work? That would also
      # be one of the first nine stories, so that's unlikely as hell
      Ship.find(id)
        .ship_characters
        .pluck(:id)
        .each do |i| 
        sa["ship_characters_attributes"]["12#{id}"] = {"character_id" => i.to_i, "_destroy" => true}
      end
    end
    ship_ids = p["ships_attributes"].map{|_, k|
      logger.debug("*" * 80)
      logger.debug(k)
    }.compact
    ##
    # Delete any ship we don't want
    del_ids = @story.ships.pluck(:id) - ship_ids
    del_ids.each do |id|
      # Rails passes this as a hash of hashes
      # since the values don't actually matter anyway, we just use 
      # a prefix (to prevent collisions) and the id 
      # if a user has over 1121 ships in their story, this may collide
      # but honestly they they probably deserve it at that point, jeez
      p["ships_attributes"]["112#{id}"] = {"id" => id, "_destroy" => true}
    end
    return p
  end
end
