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

require 'rails_helper'

RSpec.describe StoryCharacter, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
