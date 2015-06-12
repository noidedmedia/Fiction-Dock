require 'rails_helper'

RSpec.describe Searcher do
  let(:characters){3.times.map{FactoryGirl.create(:character)}}
  let(:story_with_neither){ FactoryGirl.create(:story)}
  let(:story_with_characters){FactoryGirl.create(:story,
                                                 characters: characters)}
  let(:story_with_ship){FactoryGirl.create(:story,
                                           characters: characters)}
  let(:ship){FactoryGirl.create(:ship,
                                story: story_with_ship)}
  it "finds via ships" do
    hs = {
      "ship" => ship.characters.pluck(:id).join(", ")
    }
    searcher = Searcher.new(hs)
    expect(searcher.resolve).to eq([story_with_ship])
  end
  it "finds via characters" do
    hs = { 
      "characters" => characters.map(&:id).join(", ")
    }
    characters.each do |car|
      story_with_ship.characters << car
      story_with_characters.characters << car
    end
    searcher = Searcher.new(hs)
    expect(searcher.resolve).to contain_exactly(story_with_characters, 
                                                story_with_ship)

  end
end
