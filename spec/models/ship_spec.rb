require 'rails_helper'

RSpec.describe Ship, type: :model do
  describe "validation" do
    it "ensures that it has at least two characters" do
      s = FactoryGirl.build(:ship)
      s.characters = [FactoryGirl.build(:character)]
      expect(s).to_not be_valid
    end
  end
end
