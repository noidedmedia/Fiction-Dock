##
# Determine who is allowed to edit stories
# (spoiler: it's the user who made them)
class StoryPolicy < ApplicationPolicy
  ##
  # Just to make life a bit easier, we allow anybody to access
  # `@user` and `@story`
  attr_accessor :user, :story
  ##
  # Set up with a user and a story
  def initialize(user, story)
    @user = user
    @story = story
  end
  ## 
  # Users can edit a story if they own it
  #
  def edit
    owned?
  end
  ##
  # Users can update a story if they own it
  def update
    owned?
  end
  ##
  # Users can try to create a story if they exist
  def new
    user
  end
  ##
  # Users can create a story if they exist
  def create
    user
  end
  ##
  # Users can destroy a story if they own it
  def destroy
    owned?
  end

  protected
  ##
  # Does the user own this story?
  def owned?
    @story.user == @user
  end
end
