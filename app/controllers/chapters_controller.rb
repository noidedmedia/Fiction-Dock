class ChaptersController < ApplicationController
  include Pundit
  before_action :authenticate_user!, except: [:show]
  def show
    @chapter = Chapter.find(params[:id])
  end

  def new
    @story = Story.find(params[:story_id])
    @chapter = Chapter.new(story: @story)
  end

  def create
    @chapter = Chapter.new(chapter_params)

  end

  def chapter_params
    params.require(:chapter)
      .permit(:body,
              :chap_num)
      .merge(story_id: story_id)
  end
end
