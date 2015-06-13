#
# A user is exactly what it says on the tin: somebody who uses FictionDock.
# We use `Devise` for our authentication, so check out their docs as well.
# 
# @attr [String] name this user's name
class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  ##
  # All the comments this user has made
  # @return [ActiveRecord::Relation<Comment>]
  has_many :comments
  ##
  # All the Stories this user has written
  # @return [ActiveRecord::Relation<Story>]
  has_many :stories
  ##
  # A join table of `Franchise` to `User`.
  # This is allows us to see what franchises this user manages.
  # @return [ActiveRecord::Relation<FranchiseUser>]
  has_many :franchise_users
  ##
  # All the franchises this user manages.
  # Users who manage a franchise can update its description,
  # add or remove chracters, and do a variety of other tasks.
  # @return [ActiveRecord::Relation<Franchise>]
  has_many :franchises, through: :francise_users
  ##
  # A join table of `User` to `Story`.
  # Shows what stories this user is subscribed to
  # @return [ActiveRecord::Relation<Subscription>]
  has_many :subscriptions
  ##
  # The stories this user is subscribed to.
  # At a later date, this will cause a notification to be sent to this user
  # whenever a story in this list updates.
  # @return [ActiveRecord::Relation<Story>]
  has_many :subscribed_stories, through: :subscriptions, class_name: "Story", foreign_key: "story_id"

  enum level: [:normal, :mod, :admin]
  validates :name,
    presence: true,
    format: {with: /\A\w+\z/},
    uniqueness: {case_sensative: false},
    length: {in: 2..25}

  def mod_or_higher?
    level == "mod" || level == "admin"
  end
end
