##
# Handle all actions on a user.
class UsersController < ApplicationController
  ##
  # Display a list of all users
  # TODO: paginate this
  def index
    @users = User.all
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
  end

  ##
  # Get all stories written by a given user
  def stories
    @user = User.friendly.find(params[:id])
    @stories = @user.stories
  end

end
