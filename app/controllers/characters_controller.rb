class CharactersController < ApplicationController
  before_action :load_franchise
  before_action :authenticate_user!, except: [:show, :index]
  def index
    @characters = @franchise.characters
  end

  def show
    @character = Character.find(params[:id])
  end
  protected
  def load_franchise
    @franchise = Franchise.find(params[:id])
  end
end
