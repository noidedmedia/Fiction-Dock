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
    body "It was a dark and stormy night. The cliches were too strong."
    name "Part 1: The beginning"
    chap_num 1
    story 
  end
end
