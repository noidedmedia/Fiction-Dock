##
# A franchise is a media property. It encompasses all forms of media (so the 
# LOTR movies and the LOTR books are considered the same franchsise).
#
#== Relations (Excluding Join Tables)
# stories:: stories that take place in the universe of this franchise. Note
#           that this does include crossovers.
# characters:: characters that belong to this franchise.
class Franchise < ActiveRecord::Base
  validates :name, length: {minimum: 2, maximum: 100}, uniqueness: {case_sensative: false}
  validates :description, length: {minimum: 4, maximum: 1000}
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_many :story_franchises
  has_many :franchise_users
  has_many :users, through: :franchise_users
  has_many :stories, through: :story_franchises
  has_many :characters
  
  def moderated_by?(user)
    return false unless user
    users.include?(user)
  end

  def ships
    Ship.joins(:characters).where(characters: {franchise_id: id}).uniq
  end

  def foreign_ships
    Ship.where(id: ships).joins(:characters).where.not(characters: {franchise_id: id})
  end
end
