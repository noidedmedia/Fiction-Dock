require 'active_support/concern'

module ControllerCommentable
  extend ActiveSupport::Concern
  included do
    before_filter :load_comments, only: [:show]
  end

  def load_comments
    @commentable = find_commentable
    @comments = @commentable.comments
    if current_user
      @comment = @commentable.comments.build
    end
  end

  private
  def find_commentable
    klass = params[:controller].singularize.classify.constantize
    ##
    # Use friendly id's finder if this controller works with a class that
    # extends FriendlyId
    if klass.is_a? FriendlyId
      klass.friendly.find(params[:id])
    else # use default finder
      klass.find(params[:id])
    end
  end
end
