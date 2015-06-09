FactoryGirl.define do
  factory :ship do
    story
    transient do 
      characters_count 2
    end
    after(:build) do |ship, ev|
      ship.characters = ship.story.characters.sample(ev.characters_count)
    end
  end

end
