##
# Join table: `franchise` <-> `user`
class FranchiseUser < ActiveRecord::Base
  belongs_to :user
  belongs_to :franchise
end
