# == Schema Information
#
# Table name: read_chapters
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  chapter_id :integer
#

class ReadChapter < ActiveRecord::Base
  belongs_to :user
  belongs_to :chapter
  validates :chapter_id, uniqueness: {scope: :user_id}
end
