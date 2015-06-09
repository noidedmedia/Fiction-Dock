##
# a Comment is a polymorphic model representing, as the name implies, a
# comment on something. 
#
# It's generic, so we can use it with many other models.
class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  belongs_to :user
end
