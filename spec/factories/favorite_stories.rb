# == Schema Information
#
# Table name: favorite_stories
#
#  id         :integer          not null, primary key
#  story_id   :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :favorite_story do
    story 
    user 
  end

end
