# == Schema Information
#
# Table name: story_characters
#
#  id           :integer          not null, primary key
#  story_id     :integer
#  character_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

##
# Join table: `story <-> character`
#
class StoryCharacter < ActiveRecord::Base
  belongs_to :story
  belongs_to :character
end
