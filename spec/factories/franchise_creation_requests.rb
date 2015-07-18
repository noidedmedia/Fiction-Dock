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

FactoryGirl.define do
  factory :franchise_creation_request do
    user 
    name "MyString"
    description "MyText"
    reason "MyText"
  end

end
