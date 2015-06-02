class Story < ActiveRecord::Base
  validates :title, length: {in: (2..100)}
  validates :description, length: {in: (10..1000)}
  has_many :story_characters
  has_many :characters, through: :story_characters
end
