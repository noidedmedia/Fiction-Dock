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

FactoryGirl.define do
  factory :character do
    franchise nil
name "MyString"
description "MyText"
  end

end
