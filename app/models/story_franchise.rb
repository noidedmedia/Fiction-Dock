# == Schema Information
#
# Table name: story_franchises
#
#  id           :integer          not null, primary key
#  story_id     :integer
#  franchise_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class StoryFranchise < ActiveRecord::Base
  belongs_to :story
  belongs_to :franchise
end
