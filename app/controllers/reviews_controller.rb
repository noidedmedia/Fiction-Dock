class ReviewsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :load_story
  include Pundit
  def index
    @reviews = @story.reviews
  end

  def show
    @review = @story.reviews.find(params[:id])
  end

  def new
    @review = @story.reviews.build
    authorize @review
  end

  def create
    @review = @story.reviews.build(review_params)
    respond_to do |format|
      if @review.save
        format.html{ redirect_to [@story, @review]}
      else
        format.html{ render 'new'}
      end
    end
  end
  protected
  def review_params
    params.require(:review)
      .permit(:name, :body)
      .merge(user_id: current_user.id)
  end
  def load_story
    @story = Story.find(params[:story_id])
  end

end
