# == Schema Information
#
# Table name: subscriptions
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  story_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

##
# Join table: `user` <-> `story`
class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :story
end
