class StoriesController < ApplicationController
  include Pundit
  before_filter :authenticate_user!, except: [:show, :index]
  def index
    @franchise = Franchise.find(params[:franchise_id])
    @stories = @franchise.stories
  end

  def show
    @story = Story.find(params[:id])
  end

  def new
    @franchise = Franchise.find(params[:franchise_id])
    @story = Story.new(user: current_user,
                       franchises: [@franchsie])
  end

  def story_params
    params.require(:story)
      .permit(:name,
              :blurb,
              :description,
              franchises: [:id])
  end
end
