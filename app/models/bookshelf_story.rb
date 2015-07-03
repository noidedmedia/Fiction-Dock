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

class BookshelfStory < ActiveRecord::Base
  belongs_to :bookshelf
  belongs_to :story
  validates :story_id, uniqueness: {scope: :bookshelf_id}
end
