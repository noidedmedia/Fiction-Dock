class NotificationsController < ApplicationController
  before_filter :authenticate_user!
  def read
    Notification.find(params[:id]).read!
    render json: {success: true}
  end

  def index
    @notifications = current_user.notifications
    if params["include_read"]
      @notifications = @notifications.read
    else
      @notifications = @notifications.unread
    end
    render(layout: false) if request.xhr?
  end

end
