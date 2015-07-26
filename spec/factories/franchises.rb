# == Schema Information
#
# Table name: franchises
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  slug        :string
#

FactoryGirl.define do
  factory :franchise do
    sequence(:name){|n| "Franchise ##{n}"}
    description { Faker::Company.bs }

    factory :franchise_with_characters do
      transient do
        characters_count 4
      end
      after(:build) do |fr, ev|
        create_list(:character, ev.characters_count, franchise: fr)
      end

      after(:create) do |fr, ev|
        fr.characters.each(&:save)
      end
    end
  end

end
