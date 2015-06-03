class Franchise < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_many :story_franchises
  has_many :stories, through: :story_franchises
  has_many :characters
end
