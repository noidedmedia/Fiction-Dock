##
# A controller to handle chapters
# Always loads the story in `params[:story_id]`
class ChaptersController < ApplicationController
  include Pundit
  before_action :load_story
  before_action :authenticate_user!, except: [:show]

  def read
    @chapter = @story.chapters.friendly.find(params[:chapter_id])
    current_user.read_chapter @chapter
    render nothing: true
  end

  ##
  # Publish this chapter
  def publish
    @chapter = @story.chapters.friendly.find(params[:id])
    authorize @chapter
    @chapter.publish
    respond_to do |format|
      format.html { redirect_to [@story, @chapter] }
      format.json { render json: @chapter.published? }
    end
  end

  ##
  # Unpublish this chapter
  def unpublish
    @chapter = @story.chapters.friendly.find(params[:id])
    authorize @chapter
    @chapter.unpublish
    respond_to do |format|
      format.html { redirect_to [@story, @chapter] }
      format.json { render json: @chapter.published? }
    end
  end

  ##
  # Check if this chapter is published
  def published
    @chapter = @story.chapters.friendly.find(params[:id])
    authorize @chapter
    respond_to do |format|
      format.json { render json: @chapter.published? }
    end
  end
  
  ##
  # Show this chapter, so a user can read it
  def show
    @chapter = @story.chapters.friendly.find(params[:id])
    authorize @chapter
  end

  ##
  # List all chapters
  # Only really useful for JSON routes
  def index
    @chapters = @story.chapters
  end

  ##
  # Make a new chapter
  # Authorizes the user first
  def new
    @chapter = Chapter.new(story: @story)
    authorize @chapter
  end

  ##
  # Create a chapter
  # Use chapter_params for more info
  def create
    @chapter = Chapter.new(chapter_params)
    authorize @chapter
    respond_to do |format|
      if @chapter.save
        format.html { redirect_to [@story, @chapter], notice: I18n.t(".notices.chapter_created_successfully") }
        format.json { render :show }
      else
        format.html { redirect_to :back, warning: @chapter.errors.full_messages.join(", ") }
        format.json { render json: @chapter.errors, status: :unprocessable_entity }
      end
    end 
  end

  ## 
  # Update a chapter
  # see chapter_params for more info
  def update
    @chapter = @story.chapters.friendly.find(params[:id])
    authorize @chapter
    respond_to do |format|
      if @chapter.update(chapter_params)
        format.html { redirect_to [@story, @chapter], notice: I18n.t(".notices.chapter_updated_successfully") }
        format.json { render :show }
      else
        format.html { redirect_to :back, warning: @chapter.errors.full_messages.join(", ") }
        format.json { render json: @chapter.errors, status: :entity_not_processable }
      end
    end
  end

  ##
  # Remove a chapter
  def destroy
    @chapter = @story.chapters.friendly.find(params[:id])
    authorize @chapter
    @chapter.destroy
    respond_to do |format|
      format.html { redirect_to @story, notice: I18n.t(".notices.chapter_deleted_successfully") }
      format.json { render json: true }
    end
  end

  def edit
    @chapter = @story.chapters.friendly.find(params[:id])
    authorize @chapter
  end

  protected
  ##
  # Always load the story from `params[:story_id]`
  def load_story
    @story = Story.find(params[:story_id])
  end

  ##
  # Parameters to make a chapter. Of the form:
  #     chapter: {
  #       body: String,
  #       name: String,
  #       chap_num: Int
  #     }
  # Automatically merges in the story_id
  def chapter_params
    params.require(:chapter)
      .permit(:body,
    :name,
    :chap_num)
      .merge(story_id: params[:story_id])
  end
end
