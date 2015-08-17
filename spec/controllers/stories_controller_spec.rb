require 'rails_helper'

RSpec.describe StoriesController, type: :controller do
  include Devise::TestHelpers
  context "when logged in" do
    before(:each) do
      @user = FactoryGirl.create(:user)
      sign_in @user
    end
    describe "post #create" do
      it "accepts an array of franchise ids" do
        f1 = FactoryGirl.create(:franchise_with_characters)
        f2 = FactoryGirl.create(:franchise)
        expect{
          post(:create, story: {
            name: "A test story",
            blurb: "A story we use to test",
            description: "When the test does test, who will test?",
            franchise_ids: [f1.id, f2.id],
            character_ids: f1.characters.pluck(:id)
          })
        }.to change{Story.count}.by(1)
        expect(Story.last.franchises).to contain_exactly(f1, f2)
      end
      it "accepts ships" do
        f1 = FactoryGirl.create(:franchise_with_characters,
                                characters_count: 4)
        ship = FactoryGirl.create(:ship, characters: f1.characters[0..1])
        ship_attrs = [{character_ids: ship.characters.pluck(:id)},
          {character_ids: f1.characters[2..3].map(&:id)}]
        expect{
          post(:create, story: {
          name: "A test story",
          blurb: "Story we use to test",
          description: "When the test does test who will do test?",
          franchise_ids: [f1.id],
          character_ids: f1.characters.pluck(:id),
          ship_attrs: ship_attrs
        })
        }.to change{Story.count}.by(1)
        expect(Story.last.ships).to include(ship)
        expect(Story.last.ships).to include(Ship.with_exact_ids(f1.characters[2..3].map(&:id)))
      end
    end
  end
end
