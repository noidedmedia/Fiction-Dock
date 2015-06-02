class Franchise < ActiveRecord::Base
  has_many :story_franchises
  has_many :stories, through: :story_franchises
end
