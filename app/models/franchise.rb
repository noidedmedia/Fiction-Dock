##
# A franchise is a media property. It encompasses all forms of media (so the 
# LOTR movies and the LOTR books are considered the same franchsise).
#
#== Relations (Excluding Join Tables)
# stories:: stories that take place in the universe of this franchise. Note
#           that this does include crossovers.
# characters:: characters that belong to this franchise.
class Franchise < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_many :story_franchises
  has_many :stories, through: :story_franchises
  has_many :characters
end
