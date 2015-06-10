##
# Handle all actions related to a character
# Always loads the franchise from `params[:franchise_id]`
class CharactersController < ApplicationController
  before_action :load_franchise
  before_action :authenticate_user!, except: [:show, :index]
  ##
  # Show a list of all characters in a franchise
  def index
    @characters = @franchise.characters
  end
  ##
  # Show a bio about this character
  def show
    @character = Character.friendly.find(params[:id])
  end
  
  ##
  # Create a new character
  # TODO: restrict this
  def new
    @character = Character.new(franchise: @franchise)
  end

  ##
  # Modify a character
  # TODO: restrict this
  def edit
    @character = Character.friendly.find(params[:id])
  end

  ##
  # Make a new character
  # TODO: restritct this
  def create
    @character = Character.new(character_params)
    respond_to do |format|
      if @character.save
        format.html { redirect_to [@franchise, @character] }
        format.json { render 'show' }
      else
        format.html { render 'new' }
        format.json { render json: @character.errors, status: :unproccessable_entity }
      end
    end
  end

  ##
  # Change a character
  # TODO: restrict this
  def update
    @character = Character.friendly.find(params[:id])
    respond_to do |format|
      if @character.update(character_params)
        format.html { redirect_to [@franchise, @character] }
        format.json { render 'show' }
      else
        format.html { render 'new' }
        format.json { render json: @character.errors, status: :unproccessable_entity }
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
