class ChaptersController < ApplicationController
  include Pundit
  before_action :load_story
  before_action :authenticate_user!, except: [:show]
  def show
    @chapter = Chapter.find(params[:id])
  end
  def index
    @chapters = @story.chapters
  end
  def new
    @chapter = Chapter.new(story: @story)
    authorize @chapter
  end

  def create
    @chapter = Chapter.new(chapter_params)
    authorize @chapter
    respond_to do |format|
      if @chapter.save
        format.html { redirect_to [@story, @chapter]}
        format.json { render 'show' }
      else
        format.html {render 'edit'}
        format.json { render json: @chapter.errors, status: :unprocessable_entity}
      end
    end 
  end

  def update
    @chapter = Chapter.find(params[:id])
    authorize @chapter
    respond_to do |format|
      if @chapter.update(chapter_params)
        format.html { redirect_to [@story, @chapter] }
        format.json { render 'show' }
      else
        format.html { render 'edit' }
        format.json { render json: @chapter.errors, status: :entity_not_proccessible}
      end
    end
  end

  def destroy
    @chapter = Chapter.find(params[:id])
    authorize @chapter
    @chapter.destroy
    respond_to do |format|
      format.html { redirect_to @story, notice: "successfully deleted"}
      format.json { render json: true}
    end
  end
  protected
  def load_story
    @story = Story.find(params[:story_id])
  end

  def chapter_params
    params.require(:chapter)
      .permit(:body,
              :name,
              :chap_num)
      .merge(story_id: params[:story_id])
  end


end
