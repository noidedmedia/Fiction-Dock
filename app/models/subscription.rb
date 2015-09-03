# == Schema Information
#
# Table name: subscriptions
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  story_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

##
# Join table: `user` <-> `story`
class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :story

  after_create :notify_author

  def notify_author
    Notification.create(
      event: :story_subscribed,
      subject: user,
      secondary_subject: story,
      user: story.author
    )
  end
end
