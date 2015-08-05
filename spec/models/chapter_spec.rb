require 'rails_helper'

RSpec.describe Chapter, type: :model do
  describe "ordering" do
    let(:story){FactoryGirl.create(:story)}
    let(:current){FactoryGirl.create(:chapter,
                                     story: story,
                                     chap_num: 2)}
    let(:prev_c){FactoryGirl.create(:chapter,
                                  story: story,
                                  chap_num: 1)}
    let(:next_c){FactoryGirl.create(:chapter,
                                  story: story,
                                  chap_num: 3)}
    it "can find the next chapter" do
      next_c
      expect(current.next_chapter).to eq(next_c)
    end
    it "can find the previous chapter" do
      prev_c
      expect(current.prev_chapter).to eq(prev_c)
    end
  end
  describe "word count" do
    let(:story){FactoryGirl.create(:story)}
    it "counts the words" do
      chapter = FactoryGirl.create(:chapter,
                                   story: story,
                                   body: "This has four words.")
      expect(chapter.word_count).to eq(4)
    end
  end
  describe "notifications" do
    it "notifies subscribed users when updated" do
      story = FactoryGirl.create(:story)
      user = FactoryGirl.create(:user)
      user.subscribe! story
      chapter = FactoryGirl.create(:chapter,  story: story,
                                   published: false)
      expect{chapter.publish}.to change{user.reload.notifications.count}.by(1)
    end
  end
end
