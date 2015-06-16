##
# Kind of useless controller that displays the frontpage
class FrontpageController < ApplicationController
  ##
  # Display the frontpage
  def index
    @stories = Story.order('created_at DESC').for_display.first(5)
  end
end
