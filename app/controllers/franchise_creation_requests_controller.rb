class FranchiseCreationRequestsController < ApplicationController
  before_filter :authenticate_user!
  include Pundit
  def new
    @request = FranchiseCreationRequest.new
  end

  def create
    @request = FranchiseCreationRequest.new(franchise_creation_request_params)
    respond_to do |format|
      if @request.save
        format.html { redirect_to @request }
        format.json { render 'show' }
      else
        format.html { render 'new' }
        format.json { render json: @request.errors, status: :unprocessible_entity }
      end
    end
  end

  def show
    @request = FranchiseCreationRequest.find(params[:id])
    authorize @request
  end

  def index
    @requests = policy_scope(FranchiseCreationRequest)
  end

  def accept
    @request = FranchiseCreationRequest.find(params[:id])
    authorize @request
    fr = @request.accept!
    @request.destroy
    redirect_to fr
  end

  def destroy
    @request = FranchiseCreationRequest.find(params[:id])
    authorize @request
    @request.destroy
    redirect_to action: :index
  end

  protected

  def franchise_creation_request_params
    params.require(:franchise_creation_request)
      .permit(:name, :description, :reason)
      .merge(user: current_user)
  end
end
