require 'rails_helper'

RSpec.describe FavoriteStory, type: :model do
  describe "notifications" do
    it "notifies the author" do
      s = FactoryGirl.create(:story)
      author = s.user
      user = FactoryGirl.create(:user)
      expect{
        user.favorite! s
      }.to change{author.notifications.count}.by(1)
    end
  end
end
