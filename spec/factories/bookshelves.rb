# == Schema Information
#
# Table name: bookshelves
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryGirl.define do
  factory :bookshelf do
    name { Faker::Lorem.word}
    description {Faker::Lorem.paragraph}
    user
  end

end
