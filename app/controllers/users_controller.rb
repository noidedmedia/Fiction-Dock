##
# Handle all actions on a user.
class UsersController < ApplicationController
  include Pundit
  ##
  # Display a list of all users
  def index
    @users = User.all.paginate(page: params[:page])
  end

  ##
  # Show a given user's profile
  def show
    @user = User.friendly.find(params[:id])
  end

  ##
  # Show a given user's profile
  def edit
    if current_user != User.friendly.find(params[:id])
      redirect_to edit_user_path(current_user) and return
    else
      @user = current_user
    end
    authorize @user
  end
  def update
    if current_user != User.friendly.find(params[:id])
      redirect_to edit_user_path(current_user) and return
    else
      @user = current_user
    end
    authorize @user
    respond_to do |format|
      if @user.update(user_params)
        format.html{ redirect_to @user}
        format.json { render 'show'}
      else
        format.html {render 'edit'}
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end
  ##
  # Get all stories written by a given user
  def stories
    @user = User.friendly.find(params[:id])
    @stories = Story.for_content(accepted_content)
      .where(user_id: @user.id)
  end

  protected
  def user_params
    params.require(:user)
      .permit(
        content_pref: [:adult,
                       :everybody,
                       :teen])
  end
end
