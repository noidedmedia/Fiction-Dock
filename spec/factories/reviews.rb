# == Schema Information
#
# Table name: reviews
#
#  id         :integer          not null, primary key
#  story_id   :integer
#  user_id    :integer
#  body       :text
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :review do
    story
    user 
    body { Faker::Lorem.paragraph(30)}
    name { Faker::Lorem.word}
  end

end
