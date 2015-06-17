# == Schema Information
#
# Table name: chapters
#
#  id         :integer          not null, primary key
#  body       :text
#  chap_num   :integer
#  story_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string
#  published  :boolean          default(FALSE), not null
#  slug       :string
#

require 'rails_helper'

RSpec.describe Chapter, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
