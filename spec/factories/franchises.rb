# == Schema Information
#
# Table name: franchises
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  slug        :string
#

FactoryGirl.define do
  factory :franchise do
    name "MyString"
    description "MyText"
  end

end
