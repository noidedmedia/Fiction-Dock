##
# This concern makes it easy to let users comment on models
module Commentable
  extend ActiveSupport::Concern

  included do
    has_many :comments, as: :commentable
  end
end
