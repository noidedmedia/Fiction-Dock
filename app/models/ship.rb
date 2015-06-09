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
  accepts_nested_attributes_for :ship_characters, allow_destroy: true
  before_validation :save_character_ids
  # We have to validate the ship_characters because of how the relation
  # works.
  validates :ship_characters, presence: true, length: {minimum: 2}
  protected

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
