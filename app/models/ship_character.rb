##
# Join table: `ship` <-> `character`
class ShipCharacter < ActiveRecord::Base
  belongs_to :ship, inverse_of: :ship_characters
  belongs_to :character
end
