class FavoriteStory < ActiveRecord::Base
  belongs_to :story
  belongs_to :user
  after_save :notify_author

  protected
  def notify_author
    Notification.create(
      event: "story_favorited",
      subject: story,
      user: story.user
    )
  end
end
