class Notification < ActiveRecord::Base
  belongs_to :subject, polymorphic: true

  scope :unread, ->{where(read: false)}
  scope :read, ->{where(read: true)}
  ##
  # The secondary subject is there to provide additional info.
  # For example, if this is a :story_favorited notification, the primary 
  # subject is the story that has been favorited, and the secondary subject
  # is the user who favorited it.
  belongs_to :secondary_subject, polymorphic: true
  belongs_to :user
  enum event: [
    # Created when one of this users' stories is favorited 
    # subject: story favorited
    # secondary_subject: user who favorited
    :story_favorited,
    # Created when one of this user's stories is added to a bookshelf
    # subject: story added
    # secondary_subject: bookshelf added to
    :story_added_to_bookshelf,
    # created when one of this users's stories is reviewed
    # subject: review
    # secondary_subject: story reviewed
    :story_reviewed,
    # Notified when a new chapter is published in a subscribed story
    # subject: story
    # secondary_subject: the chapter
    :subscribed_updated,
    :commented_on
  ]

  def read!
    update(read: true)
  end
end
