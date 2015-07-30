##
# Handle all actions on a user.
class UsersController < ApplicationController
  include Pundit
  
  ##
  # Display a list of all users
  def index
    @users = User.all.order('created_at DESC').paginate(page: params[:page])
  end

  ##
  # Show a given user's profile
  #
  # @user is the User a given page belongs to.
  #
  # @stories is all the user's stories regardless of published state
  # if the current user is the owner of the page. Otherwise, only
  # stories that are published and conform to certain restrictions
  # set by the user (e.g. the story content rating) are displayed.
  #
  def show
    @user = User.friendly.find(params[:id])

    if current_user == @user
      @stories = Story.where(user_id: @user.id)
        .paginate(page: page, per_page: per_page)
    else
      @stories = Story.for_content(accepted_content)
        .where(user_id: @user.id)
        .for_display
        .paginate(page: page, per_page: per_page)
    end

    @bookshelves = Bookshelf.where(user_id: @user.id)
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
        format.html { redirect_to @user }
        format.json { render :show }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
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
