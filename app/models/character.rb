class Character < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
  belongs_to :franchise
  has_many :story_characters
  has_many :stories, through: :characters
  validates :franchise, presence: true

  validates :name, presence: true

end
