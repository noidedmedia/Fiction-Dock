require 'rails_helper'

RSpec.describe Ship, type: :model do
  describe "validation" do
    it "ensures that it has at least two characters" do
      s = FactoryGirl.build(:ship)
      s.characters = [FactoryGirl.build(:character)]
      expect(s).to_not be_valid
    end
    it "ensures all characters are in the story" do
      story = FactoryGirl.create(:story)
      ship = FactoryGirl.create(:ship)
      ship.characters = 2.times.map{FactoryGirl.create(:character)}
      expect(ship).to_not be_valid
    end
  end
end
