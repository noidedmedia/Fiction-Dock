require 'rails_helper'

RSpec.describe BookshelvesController, type: :controller do
  include Devise::TestHelpers
  context "when logged in" do
    before(:each) do
      @user = FactoryGirl.create(:user)
      sign_in @user
    end
    describe "get #show" do
      let(:story){FactoryGirl.create(:story)}
      let(:bookshelf){FactoryGirl.create(:bookshelf,
                                         stories: [story])}
      it "is successful" do
        expect(response).to be_success
      end
      it "sets stories to a list of stories" do
        get :show, user_id: @user.id, id: bookshelf.id
        expect(assigns(:stories)).to eq(bookshelf.stories)
      end 
    end # get #show
    describe "post #create" do
      context "with valid attributes" do
        let(:attrs){FactoryGirl.attributes_for(:bookshelf)}
        it "makes a new bookshelf" do
          expect{
            post :create, user_id: @user.id,
              bookshelf: attrs
          }.to change{Bookshelf.count}.by(1)
        end
      end # with valid attributes
    end # post create
  end # context when logged in
end
