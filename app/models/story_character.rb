##
# Join table: `story <-> character`
#
class StoryCharacter < ActiveRecord::Base
  belongs_to :story
  belongs_to :character
end
