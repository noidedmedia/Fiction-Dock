require 'rails_helper'

RSpec.describe CharactersController, type: :controller do
  include Devise::TestHelpers
  let(:franchise){FactoryGirl.create(:franchise)}
  context "when logged in" do
    before(:each) do
      @user = FactoryGirl.create(:user, level: :admin)
      sign_in @user
    end
    describe "post #create" do
      it do 
        @request.env['HTTP_REFERER'] = '/franchises/1/new'
        should permit(:name, :description)
          .for(:create, params: {franchise_id: franchise.id})
      end
      it "makes a new record" do
        expect{
          post(:create,
               franchise_id: franchise.id,
               character: FactoryGirl.attributes_for(:character))
        }.to change{Character.count}.by(1)
      end
    end
    describe "put #update" do
      let(:character){FactoryGirl.create(:character,
                                         franchise: franchise)}
      it do
        should permit(:name, :description)
          .for(:update, params: {franchise_id: franchise.id, id: character.id})
      end
      it "responds successfully" do
        put(:update,
            id: character.id,
            franchise_id: franchise.id,
            character: FactoryGirl.attributes_for(:character))
        expect(response).to redirect_to([franchise, character])
      end
      it "updates the record" do
        expect{
          put(:update,
          id: character.id,
          franchise_id: franchise.id,
          character: FactoryGirl.attributes_for(:character, name: "test"))
        }.to change{character.reload.name}.to("test")
      end
    end
  end
end
