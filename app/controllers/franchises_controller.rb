##
# Handle all actions related to a franchise
class FranchisesController < ApplicationController
  include Pundit
  before_action :authenticate_user!, only: [:new, :edit]
  after_action :verify_authorized, except: [:complete, :index, :show, :stories]
  
  ##
  # Get all stories under this franchise
  def stories
    @franchise = Franchise.friendly.find(params[:id])
    @stories = Story.for_content(accepted_content)
      .joins(:franchises).where(franchises: {id: @franchise.id})
      .for_display
      .paginate(page: page, per_page: per_page)
  end

  ##
  # Autocomplete a franchise by name
  # Only really useful with JSON
  # Names are case-insensitive
  def complete
    @franchises = Franchise.where(["name ILIKE ?", "#{params[:query]}%"]).limit(8)
  end

  ##
  # List all franchises
  def index
    @franchises = Franchise.all.order('created_at DESC').paginate(page: params[:page])
  end

  ##
  # Create a new franchise
  def new
    @franchise = Franchise.new
    authorize @franchise
  end

  ##
  # Edit a franchise
  # TODO: restrict this only to authorized users
  def edit
    @franchise = Franchise.friendly.find(params[:id])
    authorize @franchise
  end

  ##
  # Show a franchise, including stories within
  def show
    @franchise = Franchise.friendly.find(params[:id])
    @stories = Story.for_content(accepted_content)
      .for_display
      .joins(:franchises).where(franchises: {id: @franchise.id})
      .paginate(page: page, per_page: per_page)
  end

  def update
    @franchise = Franchise.friendly.find(params[:id])
    authorize @franchise
    respond_to do |format|
      if @franchise.update(franchise_params)
        format.html { redirect_to @franchise, notice: I18n.t(".notices.franchise_updated_successfully") }
        format.json { render :show, status: :created, location: @franchise}
      else
        format.json { redirect_to :back, warning: @franchise.errors.full_messages.join(", ") }
        format.json { render json: @franchise.errors, status: :unprocessable_entity }
      end
    end
  end

  ##
  # Make a new franchise
  # TODO: restrict this
  def create
    @franchise = Franchise.new(franchise_params)
    authorize @franchise
    respond_to do |format|
      if @franchise.save
        format.html { redirect_to @franchise, notice: I18n.t(".notices.franchise_created_successfully") }
        format.json { render :show, status: :created, location: @franchise }
      else
        format.html { redirect_to :back, warning: @franchise.errors.full_messages.join(", ") }
        format.json { render json: @franchise.errors, status: :unprocessable_entity }
      end
    end
  end

  protected
  ##
  # Parameters needed to create a franchise
  def franchise_params
    params.require(:franchise)
      .permit(:name,
              :description)
  end
end
