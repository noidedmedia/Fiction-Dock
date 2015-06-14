class StoryShip < ActiveRecord::Base
  belongs_to :story
  belongs_to :ship
  validates :story, presence: true
  validates :ship, presence: true
  validates :ship_id, uniqueness: {scope: :story_id}
end
