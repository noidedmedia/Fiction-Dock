class BookshelfStory < ActiveRecord::Base
  belongs_to :bookshelf
  belongs_to :story
  validates :story_id, uniqueness: {scope: :bookshelf_id}
  after_save :notify_author

  def notify_author
    Notification.create(event: :story_added_to_bookshelf,
                        subject: story,
                        secondary_subject: bookshelf,
                        user: story.user)
  end
end
