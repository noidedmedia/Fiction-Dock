##
# Kind of useless controller that displays the frontpage
class FrontpageController < ApplicationController
  ##
  # Display the frontpage
  def index
    @stories = Story.for_content(accepted_content)
      .for_display
      .limit(5)

    if current_user
      @current_user_stories = Story.where(user_id: current_user.id)
    end
  end
end
