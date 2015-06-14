FactoryGirl.define do
  factory :ship do
    transient do 
      story_count 1
      characters_count 2
    end
    after(:build) do |ship, ev|
      ship.characters << ev.characters_count.times.map{ create(:character)}
    end
  end

end
