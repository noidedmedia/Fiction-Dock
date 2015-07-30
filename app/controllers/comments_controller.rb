class CommentsController < ApplicationController
  
  def index
    @commentable = find_commentable
    @comments = @commentable.comments
  end
  
  def create
    @commentable = find_commentable
    @comment = @commentable.comments.build(comment_params)
    respond_to do |format|
      if @comment.save
        format.html { redirect_to @commentable }
      else
        format.html do
          flash[:error] = "Couldn't add comment"
          redirect_to @commentable
        end # format.html
      end # if
    end # respond_to
  end
  
  protected

  def comment_params
    params.require(:comment)
      .permit(:body)
      .merge(user_id: current_user.id)
  end

  def find_commentable
    params.each do |name, value|
      if name =~ /(.+)_id$/
        klass = $1.classify.constantize
        ##
        # Use a friendlyid finder if this commentable normally does
        if klass.is_a? FriendlyId
          return klass.friendly.find(value)
        else # use normal finder
          return klass.find(value)
        end # friendlyid check
      end # name regex check
    end # each
  end

end
