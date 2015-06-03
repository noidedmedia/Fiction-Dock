require 'rails_helper'

RSpec.describe StoriesController, type: :controller do
  include Devise::TestHelpers
  context "when logged in" do
    before(:each) do
      @user = FactoryGirl.create(:user)
      sign_in @user
    end
    describe "post #create" do
      it "accepts nested attributes" do
        f1 = FactoryGirl.create(:franchise)
        f2 = FactoryGirl.create(:franchise) 
      
        expect{
          post(:create, story: {
            name: "A test story",
            blurb: "A story we use to test",
            description: "When the test does test, who will test?",
            franchise_ids: [f1.id, f2.id]
          })
        }.to change{Story.count}.by(1)
        expect(Story.last.franchises).to contain_exactly(f1, f2)
      end
    end
  end
end
