##
# A user is exactly what it says on the tin: somebody who uses FictionDock.
# We use `Devise` for our authentication, so check out their docs as well.
#
#== Relations (exlcuding join tables)
# comments:: the comments this user has made
# franchises:: the franchises this user moderates. Moderating a franchise
#              allows a user to change its description, add or remove
#              characters, and other such tasks.
# subscribed_stories:: the stories this user is subscribed to. At some point
#                      in the near future, these stories will generate a
#                      notification the user when updated.
class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :comments
  has_many :stories
  has_many :franchise_users
  has_many :franchises, through: :francise_users
  has_many :subscriptions
  has_many :subscribed_stories, through: :subscriptions, class_name: "Story", foreign_key: "story_id"
  enum level: [:normal, :mod, :admin]
  validates :name, presence: true, format: {with: /\A\w+\z/}
end
