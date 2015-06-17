# == Schema Information
#
# Table name: story_ships
#
#  id         :integer          not null, primary key
#  story_id   :integer
#  ship_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class StoryShip < ActiveRecord::Base
  belongs_to :story
  belongs_to :ship
  validates :story, presence: true
  validates :ship, presence: true
  validates :ship_id, uniqueness: {scope: :story_id}
end
