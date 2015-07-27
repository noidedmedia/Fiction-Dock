FactoryGirl.define do
  factory :review do
    story
    user 
    body { Faker::Lorem.paragraph(30)}
    name { Faker::Lorem.word}
  end

end
