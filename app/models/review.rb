class Review < ActiveRecord::Base
  belongs_to :story
  belongs_to :user
  validates :story, presence: true
  validates :user, presence: true
  validates :body, presence: true, length: {in: (600..100000)}
  validates :name, presence: true
  after_create :notify_author

  def notify_author
    Notification.create(
      subject: self,
      secondary_subject: story,
      user: story.user,
      event: :story_reviewed
    )
  end
end
