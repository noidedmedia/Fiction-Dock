##
# A character represents exactly what it says on the tin: a character in a 
# fictional work.
#
# Characters belong to a franchise. So "The Heavy" belongs to the franchise 
# "TF2". Characters can only belong to one franchise at once, so the various
# incarnations of King Arthur are considered seperate characters.
class Character < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
  ##
  # Franchise this character belongs to
  belongs_to :franchise
  ##
  # Join table: `Story` <-> `Characters`
  #
  # Allows us to place this character in multiple stories
  has_many :story_characters
  ##
  # Stories with this character in them
  has_many :stories, through: :story_characters
  validates :franchise, presence: true
  validates :name, presence: true, 
    length: {in: (1..40)}, 
    uniqueness: {case_sensative: false, scope: :franchise_id}
  validates :description, length: { maximum: 1500 }
  has_many :ship_characters
  has_many :ships, through: :ship_characters

  def foreign_ships
    ships.joins(:characters).where.not(characters: {franchise_id: franchise_id})
  end
end
