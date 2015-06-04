# == Schema Information
#
# Table name: story_franchises
#
#  id           :integer          not null, primary key
#  story_id     :integer
#  franchise_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

FactoryGirl.define do
  factory :story_franchise do
    story nil
franchise nil
  end

end
