# == Schema Information
#
# Table name: franchise_creation_requests
#
#  id          :integer          not null, primary key
#  user_id     :integer
#  name        :string
#  description :text
#  reason      :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe FranchiseCreationRequest, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
