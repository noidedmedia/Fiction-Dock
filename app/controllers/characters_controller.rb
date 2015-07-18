##
# Handle all actions related to a character
# Always loads the franchise from `params[:franchise_id]`
class CharactersController < ApplicationController
  include Pundit

  before_action :load_franchise, except: [:index]
  before_action :authenticate_user!, except: [:show, :index]

  ##
  # Show a list of all characters
  def index
    @characters = Character.all.order('created_at DESC').paginate(page: params[:page])
  end

  ##
  # Show a bio about this character
  def show
    @character = Character.friendly.find(params[:id])
    @stories = Story.for_content(accepted_content)
      .for_display.joins(:characters).where(characters: {id: @character.id})
      .paginate(page: page, per_page: per_page)
  end
  
  ##
  # Create a new character
  # TODO: restrict this
  def new
    @character = Character.new(franchise: @franchise)
    authorize @character
  end

  ##
  # Modify a character
  # TODO: restrict this
  def edit
    @character = Character.friendly.find(params[:id])
    authorize @character
  end

  ##
  # Make a new character
  # TODO: restritct this
  def create
    @character = Character.new(character_params)
    authorize @character
    respond_to do |format|
      if @character.save
        format.html { redirect_to [@franchise, @character] }
        format.json { render :show }
      else
        format.html { redirect_to :back, warning: @character.errors.full_messages.join(", ") }
        format.json { render json: @character.errors, status: :unprocessable_entity }
      end
    end
  end

  ##
  # Change a character
  # TODO: restrict this
  def update
    @character = Character.friendly.find(params[:id])
    authorize @character
    respond_to do |format|
      if @character.update(character_params)
        format.html { redirect_to [@franchise, @character] }
        format.json { render :show }
      else
        format.html { redirect_to :back, warning: @character.errors.full_messages.join(", ") }
        format.json { render json: @character.errors, status: :unprocessable_entity }
      end
    end
  end

  protected

  ##
  # Always load a franchise into `@franchise` from `params[:franchise_id]`
  def load_franchise
    @franchise = Franchise.friendly.find(params[:franchise_id])
  end

  ##
  # Parameters to make a character. Of the form:
  #     character{
  #       name: String,
  #       description: String
  #     }
  def character_params
    params.require(:character)
      .permit(:name, :description)
      .merge(franchise_id: @franchise.id)
  end
end
