##
# Kind of useless controller that displays the frontpage
class FrontpageController < ApplicationController
  ##
  # Display the frontpage
  def index
    @stories = Story.for_display.limit(5)
  end
end
