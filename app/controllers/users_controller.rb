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
  # Get all stories written by a given user
  def stories
    @user = User.friendly.find(params[:id])
    @stories = @user.stories
  end

end
