# == Schema Information
#
# Table name: story_characters
#
#  id           :integer          not null, primary key
#  story_id     :integer
#  character_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

FactoryGirl.define do
  factory :story_character do
    story nil
character nil
  end

end
