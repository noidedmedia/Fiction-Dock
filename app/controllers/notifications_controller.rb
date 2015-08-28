class NotificationsController < ApplicationController
  before_filter :authenticate_user!
  def read
    @notification = Notification.find(params[:id])
    if @notification.user != current_user
      render json: {success: false}
    else
      @notification.read!
      render json: {success: true}
    end
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
