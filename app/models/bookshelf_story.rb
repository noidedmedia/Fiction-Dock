class BookshelfStory < ActiveRecord::Base
  belongs_to :bookshelf
  belongs_to :story
end
