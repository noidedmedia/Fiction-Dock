##
# Kind of useless controller that displays the frontpage
class FrontpageController < ApplicationController
  ##
  # Display the frontpage
  #
  # @recent_stories is a list of the 5 most recent published stories.
  #
  # @current_user_stories are displayed only if a user is logged in,
  # and are all stories belonging to the current user, regardless of
  # published state.
  #
  def index
    @recent_stories = Story.for_content(accepted_content)
      .for_display
      .limit(5)
    @popular_stories = RatingResolver.new(accepted_content)
      .resolve(Story.by_favorites)
      .for_display
      .limit(5)

    if current_user
      @current_user_stories = Story.where(user_id: current_user.id)
        .limit(5)
    end
  end
end
