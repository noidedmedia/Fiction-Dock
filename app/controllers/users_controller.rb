class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def stories
    @user = User.find(params[:id])
    @stories = @user.stories
  end

end
