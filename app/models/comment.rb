##
# a Comment is a polymorphic model representing, as the name implies, a
# comment on something. 
#
# It's generic, so we can use it with many other models.
class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  belongs_to :user
  validates :user, presence: true
  validates :commentable, presence: true

  after_create :notify_author

  def notify_author
    return unless commentable.respond_to? :user
    Notification.create(
      subject: self,
      secondary_subject: commentable,
      event: :commented_on,
      user: commentable.user)
  end
end
