require 'rails_helper'

RSpec.describe Character, type: :model do
  describe "validation" do
    it "validates the name's uniqueness on the franchise" do
      name = "bob"
      f1 = FactoryGirl.create(:franchise)
      f2 = FactoryGirl.create(:franchise)
      FactoryGirl.create(:character,
                         franchise: f1,
                         name: name)
      c = FactoryGirl.build(:character,
                            franchise: f2, 
                            name: name)
      expect(c).to be_valid
      c.save
      same_fr = FactoryGirl.build(:character,
                                  franchise: f2,
                                  name: name)
      expect(same_fr).to_not be_valid
    end
  end
end
