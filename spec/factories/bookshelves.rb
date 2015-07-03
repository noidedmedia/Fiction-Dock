FactoryGirl.define do
  factory :bookshelf do
    name { Faker::Lorem.word}
    description {Faker::Lorem.paragraph}
    user
  end

end
