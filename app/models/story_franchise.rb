class StoryFranchise < ActiveRecord::Base
  belongs_to :story
  belongs_to :franchise
end
