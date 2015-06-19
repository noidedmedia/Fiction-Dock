# == Schema Information
#
# Table name: story_ships
#
#  id         :integer          not null, primary key
#  story_id   :integer
#  ship_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :story_ship do
    story 
    ship
  end

end
