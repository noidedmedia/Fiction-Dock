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

require 'rails_helper'

RSpec.describe ShipCharacter, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
