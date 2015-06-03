FactoryGirl.define do
  factory :user do
    name "MyString"
    email { Faker::Internet.email } 
    password { Faker::Internet.password(8) }
  end

end
