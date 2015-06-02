class FranchiseController < ApplicationController
  def new
    @franchise = Franchise.new
  end

  def create
    @franchise = Franchise.new(franchise_params)
  end

  protected
  def franchise_params
    params.require(:franchise)
      .permit(:name,
              :description)
  end
end
