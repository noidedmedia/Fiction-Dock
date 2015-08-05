class FavoriteStory < ActiveRecord::Base
  belongs_to :story
  belongs_to :user
  after_save :notify_author
  validates :story, presence: true
  validates :user, presence: true
  protected
  def notify_author
    Notification.create(
      event: "story_favorited",
      subject: story,
      secondary_subject: user,
      user: story.user
    )
  end
end
