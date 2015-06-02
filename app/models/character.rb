class Character < ActiveRecord::Base
  belongs_to :franchise
  has_many :story_characters
  has_many :stories, through: :characters

end
