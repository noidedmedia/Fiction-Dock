FactoryGirl.define do
  factory :ship do
    transient do 
      story_count 1
      characters_count 2
    end
    after(:build) do |ship, ev|
      create_list(:story_ship, ev.story_count, ship: ship)
      ship.characters = ship.stories.first.characters.sample(ev.characters_count)
    end
  end

end
