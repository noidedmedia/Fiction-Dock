# == Schema Information
#
# Table name: franchise_users
#
#  id           :integer          not null, primary key
#  user_id      :integer
#  franchise_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

FactoryGirl.define do
  factory :franchise_user do
    user nil
franchise nil
  end

end
