##
# See if a user may modify this chapter
class ChapterPolicy < ApplicationPolicy
  ##
  # Set up with the user trying to edit, and the chapter
  def initialize(user, chapter)
    @user = user
    @chapter = chapter
  end
  ##
  # Make it a bit easier to get the chapter
  attr_accessor :chapter

  ##
  # Users can create a new chapter if they own the story
  def new?
    owned?
  end

  ##
  # Users can edit chapters if they own the story
  def edit?
    owned?
  end

  ##
  # Users can create a new chapter if they own the story
  def create?
    owned?
  end

  ## 
  # Users can update the chapters if they own a story
  def update?
    owned?
  end
  protected
  def owned?
    @chapter.story.user == @user
  end
end
