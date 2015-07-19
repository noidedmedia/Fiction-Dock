# == Schema Information
#
# Table name: bookshelf_stories
#
#  id           :integer          not null, primary key
#  bookshelf_id :integer
#  story_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'rails_helper'

RSpec.describe BookshelfStory, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
