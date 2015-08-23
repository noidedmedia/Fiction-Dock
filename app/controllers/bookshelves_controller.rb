class BookshelvesController < ApplicationController
  before_action :authenticate_user!, except: [:show, :index]
  before_action :load_user, only: [:index, :new, :create]
  include Pundit

  def show
    @bookshelf = Bookshelf.find(params[:id])
    authorize @bookshelf
    @user = @bookshelf.user
    @stories = @bookshelf.stories
      .for_content(accepted_content)
      .for_display
      .paginate(page: page, per_page: per_page)
  end

  def add
    @bookshelf = Bookshelf.find(params[:id])
    authorize @bookshelf
    @bookshelf.stories << Story.find(story_id_param)
    respond_to do |format|
      format.html { redirect_to @bookshelf}
      format.json { render json: "success"}
    end
  end

  def remove
    @bookshelf = Bookshelf.find(params[:id])
    authorize @bookshelf
    @bookshelf.stories.delete(Story.find(story_id_param))
    respond_to do |format|
      format.html { redirect_to @bookshelf}
      format.json { render json: "success"}
    end
  end

  def index
    @bookshelves = @user.bookshelves
  end

  def edit
    @bookshelf = Bookshelf.find(params[:id])
    authorize @bookshelf
  end

  def new
    @bookshelf = Bookshelf.new(user_id: @user.id)
    authorize @bookshelf
  end
  
  def update
    @bookshelf = Bookshelf.find(params[:id])
    authorize @bookshelf
    respond_to do |format|
      if @bookshelf.update(bookshelf_params)
        format.html { redirect_to @bookshelf }
      else
        format.html { render :edit }
      end
    end
  end
  
  def create
    @bookshelf = Bookshelf.new(bookshelf_params)
    authorize @bookshelf
    respond_to do |format|
      if @bookshelf.save
        format.html { redirect_to @bookshelf }
      else
        format.html { render :new }
      end
    end
  end
  
  protected
  
  def load_user
    @user = User.friendly.find(params[:user_id])
  end

  def story_id_param
    params.require(:story)
      .permit(:id)["id"]
  end

  def bookshelf_params
    params.require(:bookshelf)
      .permit(:name,
              :description)
      .merge(user_id: current_user.id)
  end
end
