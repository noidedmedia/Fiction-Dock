require 'rails_helper'

RSpec.describe BookshelfStory, type: :model do
  it "notifies the author on create" do
    story = FactoryGirl.create(:story)
    author = story.user
    bookshelf = FactoryGirl.create(:bookshelf)
    expect{
      bookshelf.stories << story
    }.to change{author.notifications.count}.by(1)
  end
end
