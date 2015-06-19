# == Schema Information
#
# Table name: ship_characters
#
#  id           :integer          not null, primary key
#  ship_id      :integer
#  character_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

##
# Join table: `ship` <-> `character`
class ShipCharacter < ActiveRecord::Base
  belongs_to :ship, inverse_of: :ship_characters
  belongs_to :character
  validates :character_id, uniqueness: { scope: :ship_id }
end
