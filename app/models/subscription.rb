##
# Join table: `user` <-> `story`
class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :story
end