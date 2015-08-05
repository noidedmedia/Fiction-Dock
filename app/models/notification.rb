class Notification < ActiveRecord::Base
  belongs_to :subject, polymorphic: true
  ##
  # The secondary subject is there to provide additional info.
  # For example, if this is a :story_favorited notification, the primary 
  # subject is the story that has been favorited, and the secondary subject
  # is the user who favorited it.
  belongs_to :secondary_subject, polymorphic: true
  belongs_to :user
  enum event: [
    :story_favorited,
    :story_added_to_bookshelf,
    :story_reviewed,
    :subscribed_updated,
    :commented_on
  ]
end
