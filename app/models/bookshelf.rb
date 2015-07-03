class Bookshelf < ActiveRecord::Base
  belongs_to :user
  has_many :bookshelf_stories
  has_many :stories, through: :bookshelf_stories
  validates :user, presence: true
  validates :name, presence: true, length: {in: (1..100)}
  validates :description, presence: true, length: {in: (10..10000)}

end
