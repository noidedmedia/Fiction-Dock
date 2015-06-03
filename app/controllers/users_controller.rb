class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.friendly.find(params[:id])
  end

  def stories
    @user = User.friendly.find(params[:id])
    @stories = @user.stories
  end

end
