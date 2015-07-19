class ReadChapter < ActiveRecord::Base
  belongs_to :user
  belongs_to :chapter
  validates :chapter_id, uniqueness: {scope: :user_id}
end
