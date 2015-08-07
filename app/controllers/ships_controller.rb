class ShipsController < ApplicationController
  def index
    @ships = Ship.all.paginate(page: page, per_page: per_page)
  end

  def show
    @ship = Ship.find(params[:id])
    @stories = @ship.stories.paginate(page: page, per_page: per_page)
  end
end
