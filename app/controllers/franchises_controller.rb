class FranchisesController < ApplicationController
  before_action :authenticate_user!, only: [:new, :edit]
  def stories
    @franchise = Franchise.friendly.find(params[:id])
    @stories = @franchise.stories
  end

  def complete
    @franchises = Franchise.where(["name ILIKE ?", "#{params[:query]}%"])
  end
  def index

    @franchises = Franchise.all
  end

  def new
    @franchise = Franchise.new
  end

  def edit
    @franchise = Franchise.friendly.find(params[:id])
  end

  def show
    @franchise = Franchise.friendly.find(params[:id])
  end

  def create
    @franchise = Franchise.new(franchise_params)
    respond_to do |format|
      if @franchise.save
        format.html {redirect_to @franchise, notice: 'franchise created'}
        format.json { render :show, status: :created, location: @franchise }
      else
        format.html { render :new }
        formt.json { render json: @franchise.errors, status: :unprocessable_entity }
      end
    end
  end

  protected
  def franchise_params
    params.require(:franchise)
      .permit(:name,
    :description)
  end
end
