# == Schema Information
#
# Table name: bookshelves
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Bookshelf < ActiveRecord::Base
  belongs_to :user
  has_many :bookshelf_stories
  has_many :stories, through: :bookshelf_stories
  validates :user, presence: true
  validates :name, presence: true, length: {in: (1..100)}
  validates :description, presence: true, length: {in: (5..2500)}

  def self.without_story(story)
    all.where.not(id: story.bookshelves)
  end

  def self.with_story(story)
    all.where(id: story.bookshelves)
  end
end
