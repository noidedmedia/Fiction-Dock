class Notification < ActiveRecord::Base
  belongs_to :subject, polymorphic: true
  belongs_to :user
  enum event: [
    :story_favorited,
    :story_added_to_bookshelf,
    :story_reviewed,
    :subscribed_updated,
    :commented_on
  ]
end
