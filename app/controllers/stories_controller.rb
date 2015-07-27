##
# This controller manages the entire lifecycle of stories, as well as
# subscriptions on stories.
#
class StoriesController < ApplicationController
  ##
  # Use pundit for authorization
  include Pundit
  include ControllerCommentable
  before_filter :authenticate_user!, except: [:show, :index, :search, :franchises, :characters]

  def favorite
    @story = Story.find(params[:id])
    current_user.favorites << @story
    redirect_to @story
  end

  def unfavorite
    @story = Story.find(params[:id])
    current_user.favorites.delete(@story)
    redirect_to @story
  end
  ##
  # Get back a boolean value indicating if the user has favorited this story
  def favorited
    render json: current_user.has_favorited?(Story.find(params[:id]))
  end

  def ships
    @story = Story.find(params[:id])
    @ships = @story.ships
  end

  def characters
    @story = Story.find(params[:id])
    @characters = @story.characters
  end

  def franchises
    @story = Story.find(params[:id])
    @franchises = @story.franchises
  end
  
  def publish
    @story = Story.find(params[:id])
    authorize @story
    respond_to do |format|
      if @story.publish
        format.html { redirect_to @story } 
        format.json { render json: true }
      else
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  def unpublish
    @story = Story.find(params[:id])
    authorize @story
    respond_to do |format|
      if @story.unpublish
        format.json { render json: true }
        format.html { redirect_to @story }
      else
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  def published
    @story = Story.find(params[:id])
    authorize @story
    respond_to do |format|
      format.json { render json: @story.published? }
    end
  end
  
  def search
    @stories = Searcher.new(params, content: accepted_content)
      .resolve(page: params[:page] || 1)
  end

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
        format.json { render json: false }
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
        format.html { redirect_to story_path(params[:id]) }
        format.json { render json: true }
      else
        # TODO: Fix this
        format.html { redirect_to story_path(params[:id]) }
        format.json { render json: false }
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
  def index
    @stories = Story.for_content(accepted_content)
      .includes(:franchises).for_display.paginate(page: params[:page])
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
        format.json { render :show, status: :ok, location: @story }
      else
        format.html { render :edit }
        format.json { render json: @story.errors, status: :unprocessable_entity }
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
    # We re-build ships on each input
    # So we mark the old ones for destruction
    respond_to do |format|
      if @story.update(story_params)
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
    :license,
    :language,
    :franchise_ids => [],
    :character_ids => [],
    :ship_attrs => {
      characters: []      
    })
        .merge(user_id: current_user.id)
  end
end
