# == Schema Information
#
# Table name: chapters
#
#  id         :integer          not null, primary key
#  body       :text
#  chap_num   :integer
#  story_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string
#  published  :boolean          default(FALSE), not null
#  slug       :string
#  word_count :integer
#

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
end
