# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  commentable_id   :integer
#  commentable_type :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :integer
#  body             :text
#

##
# a Comment is a polymorphic model representing, as the name implies, a
# comment on something. 
#
# It's generic, so we can use it with many other models.
class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  belongs_to :user
end
