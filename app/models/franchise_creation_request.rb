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

class FranchiseCreationRequest < ActiveRecord::Base
  belongs_to :user
  validates :user, presence: true
  validates :reason, presence: true, length: {in: 1..10000}
  validates :name, presence: true, length: {in: 1..1000}
  def accept!
    Franchise.create(name: name,
                     description: description,
                     users: [user])
  end
end
