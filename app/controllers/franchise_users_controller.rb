##
# This controller manages users who admin a franchise
class FranchiseUsersController < ApplicationController
  include Pundit
  after_action :verify_authorized, except: :index
  before_action :load_franchise

  def index
    @franchise_users = @franchise.franchise_users
  end

  def new
    @franchise_user = FranchiseUser.new(franchise: @franchise)
    authorize @franchise_user
  end

  def create
    @franchise_user = FranchiseUser.new(franchise_user_params)
    authorize @franchise_user
    respond_to do |format|
      if @franchise_user.save
        format.html { redirect_to @franchise }
        format.json { render json: true }
      else
        format.html { render 'new' }
        format.json { render json: @franchise_user.errors, status: :unprocessesible_entity }
      end
    end
  end

  def destroy
    @franchise_user = @franchise.franchise_users.find(params[:id])
    authorize @franchise_user
    @franchise_user.destroy
    respond_to do |format|
      format.json {render json: true}
      format.html {redirect_to @franchise }
    end
  end

  protected
  
  def load_franchise
    @franchise = Franchise.friendly.find(params[:franchise_id])
  end

  def franchise_user_params
    params.require(:franchise_user)
      .permit(:user_id)
      .merge(franchise_id: @franchise.id)
  end
end
