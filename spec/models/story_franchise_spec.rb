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

require 'rails_helper'

RSpec.describe StoryFranchise, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
