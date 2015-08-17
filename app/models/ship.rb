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
class Ship < ActiveRecord::Base
  has_many :story_ships
  has_many :stories, through: :story_ships
  has_many :ship_characters, autosave: true
  has_many :characters, through: :ship_characters
  before_validation :set_characters
  validate :has_two_characters
  validate :characters_are_unique

  attr_accessor :character_ids
  #################
  # SCOPE METHODS #
  #################
  ##
  # Get a list of ships order by the frequency in which they appear
  # Note that this adds a story_count attribute to the ship objects
  def self.by_frequency
    joins(:stories).group(:id)
      .order("COUNT(stories) DESC")
      .select("ships.*, COUNT(stories) AS story_count")
  end
  ##################
  # FINDER METHODS #
  ##################
  def self.with_exact_ids(ids)
    find_by_sql([SQL_SELECT_BY_CHARACTER_IDS, ids, ids.length, ids]).first
  end

  #######################
  # CONSTRUCTOR METHODS #
  #######################

  def self.find_or_create_by_character_ids(ids)
    found = with_exact_ids(ids)
    return found if found
    return create(character_ids: ids)
  end
  protected
  def set_characters
    self.characters = Character.where(id: character_ids) unless character_ids.blank?
  end
  def characters_are_unique
    found = Ship.with_exact_ids(characters.pluck(:id))
    unless found.blank? || found.id == id
      errors.add(:characters, "this combination already exists")
    end
  end
  ##
  # ActiveRecord doesn't like EXCEPT, so we do this in raw SQL
  SQL_SELECT_BY_CHARACTER_IDS = %{
    SELECT ships.* FROM ships
    INNER JOIN ship_characters ON ship_characters.ship_id = ships.id
    WHERE ship_characters.character_id IN (?)
    GROUP BY ships.id
    HAVING COUNT(*) = ?
    EXCEPT
    SELECT ships.* FROM ships
    INNER JOIN ship_characters ON ship_characters.ship_id = ships.id
    WHERE ship_characters.character_id NOT IN (?)
  }
  def has_two_characters
    errors.add(:characters, "too few (need at lest two)") unless self.characters.length > 1
  end
end
