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
end
