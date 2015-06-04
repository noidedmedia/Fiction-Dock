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

class FranchiseUser < ActiveRecord::Base
  belongs_to :user
  belongs_to :franchise
end
