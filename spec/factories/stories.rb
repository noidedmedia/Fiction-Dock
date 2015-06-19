# == Schema Information
#
# Table name: stories
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  blurb       :string
#  user_id     :integer
#  published   :boolean          default(FALSE), not null
#  license     :integer          default(0), not null
#  language    :integer          default(0), not null
#

FactoryGirl.define do
  factory :story do
    content_rating :everybody
    user
    name { Faker::Name.name }
    description { Faker::Lorem.paragraph }
    blurb { Faker::Lorem.sentence }
    transient do
      franchises_count 2
      characters_count 2
    end
    after(:build) do |story, ev|
      fr = ev.franchises_count.times.map{ create(:franchise_with_characters) }
      story.franchises += fr
      cr = fr.map(&:characters).flatten.sample(ev.characters_count)
      story.characters = cr
    end

    after(:create) do |story, ev|
      story.franchises.each(&:save)
      story.characters.each(&:save)
    end
  end
end
