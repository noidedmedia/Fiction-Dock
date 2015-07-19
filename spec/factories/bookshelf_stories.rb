# == Schema Information
#
# Table name: bookshelf_stories
#
#  id           :integer          not null, primary key
#  bookshelf_id :integer
#  story_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

FactoryGirl.define do
  factory :bookshelf_story do
   bookshelf 
  story 
  end

end
