require 'rails_helper'

##
# I am officially giving up on this test, for now.
# I have manually tested the functionality on the actual /search page and it
# works as expected.
# It's only in the actual tests that it's broken.
# TODO: fix this somehow
RSpec.describe Searcher do
  let(:characters){3.times.map{FactoryGirl.create(:character)}}
  let(:story_with_neither){ FactoryGirl.create(:published_story)}
  let(:story_with_characters){FactoryGirl.create(:published_story)}
  let(:story_with_ship){FactoryGirl.create(:published_story)}
  let(:story_with_both){FactoryGirl.create(:published_story)}
  let(:ship){FactoryGirl.create(:ship)}
  let(:content){{
    "adult": true,
    "teen": true,
    "everybody": true
  }}
  before(:each) do
    characters.each do |car|
      story_with_characters.characters << car
      story_with_both.characters << car
    end
    ship.characters.each do |car|
      story_with_both.characters << car
    end
    story_with_both.ships << ship
    story_with_ship.ships << ship
  end
  it "finds via ships" do
    expect(story_with_ship.ships).to include(ship)
    expect(story_with_both.ships).to include(ship)
    hs = {
      "ship" => ship.characters.pluck(:id)
    }
    searcher = Searcher.new(hs, content: content)
    expect(searcher.resolve).to contain_exactly(story_with_ship, story_with_both)
  end
  it "finds via a ship and a character" do
    hs = {
      "ship" => ship.characters.pluck(:id),
      "characters" => characters.map(&:id)
    }
    searcher = Searcher.new(hs, content: content)
    expect(searcher.resolve(page: 1)).to eq([story_with_both])
  end
  it "finds via characters" do
    ## Note the use of the array splat
    expect(story_with_characters.characters).to include(*characters)
    expect(story_with_both.characters).to include(*characters)
    hs = { 
      "characters" => characters.map(&:id)
    }
    
    searcher = Searcher.new(hs)
    expect(searcher.resolve(page: 1)).to contain_exactly(story_with_characters, 
                                                         story_with_both)

  end
end
