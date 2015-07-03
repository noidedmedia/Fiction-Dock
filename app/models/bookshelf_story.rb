class BookshelfStory < ActiveRecord::Base
  belongs_to :bookshelf
  belongs_to :story
  validates :story_id, uniqueness: {scope: :bookshelf_id}
end
