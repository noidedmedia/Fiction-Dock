# == Schema Information
#
# Table name: characters
#
#  id           :integer          not null, primary key
#  franchise_id :integer
#  name         :string
#  description  :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  slug         :string
#

require 'rails_helper'

RSpec.describe Character, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
