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
#

FactoryGirl.define do
  factory :chapter do
    body "MyText"
title "MyString"
chap_num 1
story nil
  end

end
