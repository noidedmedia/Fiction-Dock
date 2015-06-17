# == Schema Information
#
# Table name: franchises
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  slug        :string
#

##
# A franchise is a media property. It encompasses all forms of media (so the 
# LOTR movies and the LOTR books are considered the same franchsise).
#
#== Relations (Excluding Join Tables)
# stories:: stories that take place in the universe of this franchise. Note
#           that this does include crossovers.
# characters:: characters that belong to this franchise.
class Franchise < ActiveRecord::Base
  validates :name, length: {minimum: 2, maximum: 100}
  validates :description, length: {minimum: 10, maximum: 1000}
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_many :story_franchises
  has_many :franchise_users
  has_many :users, through: :franchise_users
  has_many :stories, through: :story_franchises
  has_many :characters
  
  def moderated_by?(user)
    users.include?(user)
  end
end
