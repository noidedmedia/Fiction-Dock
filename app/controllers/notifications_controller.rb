class NotificationsController < ApplicationController
  before_filter :authenticate_user!


  def mark_all_read
   current_user.notifications.each do |n|
     n.update(read: true)
   end
   render json: {success: true}
  end

  def read
    @notification = Notification.find(params[:id])
    if @notification.user != current_user
      render json: { success: false }
    else
      @notification.read!
      render json: { success: true }
    end
  end

  def index
    @notifications = current_user.notifications
    render(layout: false) if request.xhr?
  end

  def notifications
    @notifications = current_user.notifications
  end
end
