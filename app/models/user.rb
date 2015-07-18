##
# A user is exactly what it says on the tin: somebody who uses FictionDock.
# We use `Devise` for our authentication, so check out their docs as well.
class User < ActiveRecord::Base

  extend FriendlyId
  friendly_id :name, use: :slugged

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable
  has_many :comments
  has_many :stories

  has_many :bookshelves
  has_many :franchise_users
  has_many :franchises, through: :francise_users
  has_many :subscriptions
  has_many :subscribed_stories, through: :subscriptions, class_name: "Story", foreign_key: "story_id"

  validates :name,
    presence: true,
    format: {with: /\A([[:alpha:]]+|\w+)\z/},
    uniqueness: {case_sensative: false},
    length: {in: 2..25}
  enum level: [:normal, :mod, :admin]

  def mod_or_higher?
    level == "mod" || level == "admin"
  end
  ##
  # Mark a chapter as read by this user if it has not been already
  # update word count accordingly
  def read_chapter(chapter)
    with_lock do
      if ReadChapter.new(chapter: chapter,
                         user: self).save
        self.read_words += chapter.word_count
        self.save
      end
    end
  end
end
