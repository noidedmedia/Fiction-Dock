##
# 
# It wouldn't be a place to park ships without a model for a Ship.
# This is that model.
# For those of you who are unaware, a "ship" is a term to refer to a 
# relationship in the context of fanfiction.
# 
# FictionDock's ships are, in a word, ridiculous. This model provides the 
# ability to model a relationship not just between two people, but between
# an *arbitrary number of people*.
#
# Even better, these people can be cross-franchise. So, you want to write
# a story about Captain Kirk falling in love with Sterling Archer?
# That's possible.
#
# == Relations (Excluding Join Tables)
# characters:: all characters involved in this ship
# story:: the story that this ship is in
class Ship < ActiveRecord::Base
  belongs_to :story, inverse_of: :ships
  has_many :ship_characters, autosave: true
  has_many :characters, through: :ship_characters
  ##
  # In order to make accepting nested attributes easier, we allow
  # the user to pass in an array of character ids that are then
  # resolved into real characters
  attr_accessor :character_ids
  accepts_nested_attributes_for :ship_characters
  before_validation :save_character_ids
  validates :story, presence: true
  validate :has_two_characters
  validate :characters_in_story
  protected

  def characters_in_story
    # bail early if we don't have a story, since a different validation
    # will catch that
    return unless story
    excluded = characters.where.not(id: story.characters.pluck(:id))
    if excluded.length > 0
      errors.add(:characters, "Must all be in parent story")
    end
  end
  def has_two_characters
    errors.add(:characters, "too few (need at lest two)") unless ship_characters.length > 1
  end
  ## 
  # Resolve `character_ids` into real characters
  def save_character_ids
    return unless character_ids
    characters.try :each do |c|
      c.mark_for_destruction
    end
    character_ids.each do |id|
      c = ship_characters.build(character_id: id)
    end
  end
end
