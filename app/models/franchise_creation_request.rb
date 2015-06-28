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
