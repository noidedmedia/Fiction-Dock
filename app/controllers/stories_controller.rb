class StoriesController < ApplicationController
  include Pundit
  before_filter :authenticate_user!, except: [:show, :index]
  def index
    @stories = Story.all.includes(:franchises)
  end

  def show
    @story = Story.find(params[:id])
  end

  def new
    @story = Story.new(user: current_user)
  end

  def create
    @story = Story.new(story_params)
    respond_to do |format|
      if @story.save
        format.html { redirect_to @story }
        format.json { render :show, status: :ok, location: @story}
      else
        format.html { render :edit}
        format.json { render json: @story.errors, status: :unprocessable_entity}
      end
    end

  end

  def edit 
    @story = Story.find(params[:id])
  end


  def update
    @story = Story.find(params[:id])
    @story.update(story_params)
    respond_to do |format|
      if @story.save
        format.html { redirect_to @story }
        format.json { render :show, status: ok, location: @story }
      else
        format.html { render :edit }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @story = Story.find(params[:id])
    authorize @story
    @story.destroy
    respond_to do |format|
      format.html { redirect_to "/stories" }
      format.json { render json: true }
    end
  end

  protected 
  def story_params
    params.require(:story)
      .permit(:name,
              :blurb,
              :description,
              franchises: [:id])
      .merge(user_id: current_user.id)
  end
end
