class BookshelvesController < ApplicationController
  before_action :authenticate_user!, except: [:show, :index]
  before_action :load_user, only: [:index, :new, :create]
  include Pundit

  def show
    @bookshelf = Bookshelf.find(params[:id])
    authorize @bookshelf
    @user = User.friendly.find(params[:id])
    @stories = Story.for_content(accepted_content)
      .joins(:bookshelves)
      .where(bookshelves: {id: params[:id]})
      .for_display
      .paginate(page: page, per_page: per_page)
  end

  def add
    @bookshelf = Bookshelf.find(params[:id])
    authorize @bookshelf
    @bookshelf.stories << Story.find(params[:story][:id])
    redirect_to @bookshelf
  end

  def remove
    @bookshelf = Bookshelf.find(params[:id])
    authorize @bookshelf
    @bookshelf.stories.delete(Story.find(params[:story][:id]))
    redirect_to @bookshelf
  end

  def index
    @bookshelves = @user.bookshelves
  end

  def edit
    @bookshelf = Bookshelf.find(params[:id])
    authorize @bookshelf
  end

  def new
    @bookshelf = @user.bookshelves.build
    authorize @bookshelf
  end
  
  def update
    @bookshelf = Bookshelf.find(params[:id])
    authorize @bookshelf
    respond_to do |format|
      if @bookshelf.update(bookshelf_params)
        format.html{redirect_to @bookshelf}
      else
        format.html{render 'edit'}
      end
    end
  end
  
  def create
    @bookshelf = @user.bookshelves.build(bookshelf_params)
    authorize @bookshelf
    respond_to do |format|
      if @bookshelf.save
        format.html {redirect_to  @bookshelf}
      else
        format.html {render 'new'}
      end
    end
  end
  
  protected
  
  def load_user
    @user = User.friendly.find(params[:user_id])
  end

  def bookshelf_params
    params.require(:bookshelf)
      .permit(:name,
              :description)
      .merge(user_id: current_user.id)
  end
end
