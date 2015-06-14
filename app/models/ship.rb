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
  has_many :ship_characters, autosave: true
  has_many :characters, through: :ship_characters
  accepts_nested_attributes_for :ship_characters
  validate :has_two_characters

  def self.with_exact_ids(ids)
    find_by_sql([SQL_SELECT_BY_CHARACTER_IDS, ids, ids.length, ids]).first
  end
  protected
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
    errors.add(:characters, "too few (need at lest two)") unless ship_characters.length > 1
  end
end
