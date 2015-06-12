require 'rails_helper'

RSpec.describe Searcher do
  let(:characters){3.times.map{FactoryGirl.create(:character)}}
  let(:story_with_neither){ FactoryGirl.create(:story)}
  let(:story_with_characters){FactoryGirl.create(:story)}
  let(:story_with_ship){FactoryGirl.create(:story)}
  let(:story_with_both){FactoryGirl.create(:story)}
  let(:ship){FactoryGirl.create(:ship,
                                story: story_with_ship)}
  before(:each) do
    characters.each do |car|
      story_with_characters.characters << car
      story_with_both.characters << car
    end
    ship.characters.each do |car|
      story_with_both.characters << car
    end
    s = FactoryGirl.create(:ship, story: story_with_both)
    s.characters = ship.characters
  end
  it "finds via ships" do
    hs = {
      "ship" => ship.characters.pluck(:id).join(", ")
    }
    searcher = Searcher.new(hs)
    expect(searcher.resolve).to contain_exactly(story_with_ship, story_with_both)
  end
  it "finds via a ship and a character" do
    hs = {
      "ship" => ship.characters.pluck(:id).join(", "),
      "characters" => characters.map(&:id).join(", ")
    }
    searcher = Searcher.new(hs)
    expect(searcher.resolve).to eq([story_with_both])
  end
  it "finds via characters" do
    ## Note the use of the array splat
    expect(story_with_characters.characters).to include(*characters)
    expect(story_with_both.characters).to include(*characters)
    hs = { 
      "characters" => characters.map(&:id).join(", ")
    }
    
    searcher = Searcher.new(hs)
    expect(searcher.resolve).to contain_exactly(story_with_characters, 
                                                story_with_both)

  end
end
