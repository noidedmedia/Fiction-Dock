class CharactersController < ApplicationController
  before_action :load_franchise
  before_action :authenticate_user!, except: [:show, :index]
  def index
    @characters = @franchise.characters
  end

  def show
    @character = Character.friendly.find(params[:id])
  end

  def new
    @character = Character.new(franchise: @franchise)
  end

  def edit
    @character = Character.friendly.find(params[:id])
  end

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

  def update
    @character = Character.friendly.find(params[:id]).update(character_params)
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
  protected
  def load_franchise
    @franchise = Franchise.friendly.find(params[:franchise_id])
  end

  def character_params
    params.require(:character)
      .permit(:name, :description)
      .merge(franchise_id: @franchise.id)
  end
end
