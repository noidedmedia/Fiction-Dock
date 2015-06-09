# == Schema Information
#
# Table name: characters
#
#  id           :integer          not null, primary key
#  franchise_id :integer
#  name         :string
#  description  :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  slug         :string
#

FactoryGirl.define do
  factory :character do
    franchise
    name { Faker::Name.name } 
    description { Faker::Lorem.paragraph }
   
  end

end
