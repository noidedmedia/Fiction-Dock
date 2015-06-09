##
# A character represents exactly what it says on the tin: a character in a 
# fictional work.
#
# Characters belong to a franchise. So "The Heavy" belongs to the franchise 
# "TF2". Characters can only belong to one franchise at once, so the various
# incarnations of King Aurthur are considered seperate characters.
class Character < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
  belongs_to :franchise
  has_many :story_characters
  has_many :stories, through: :story_characters
  validates :franchise, presence: true
  validates :name, presence: true, uniqueness: {case_sensative: false}
end
