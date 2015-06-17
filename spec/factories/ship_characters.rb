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

FactoryGirl.define do
  factory :ship_character do
    ship nil
character nil
  end

end
