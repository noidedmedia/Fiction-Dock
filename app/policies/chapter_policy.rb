##
# See if a user may modify this chapter
class ChapterPolicy < ApplicationPolicy
  class Scope
    attr_reader :user, :scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      if (s = scope.first) and @user and Story.find(s.story_id).user_id == @user.id
        scope.all
      else
        scope.published
      end
    end
  end

  ##
  # Set up with the user trying to edit, and the chapter
  def initialize(user, chapter)
    @user = user
    @chapter = chapter
  end

  ##
  # Make it a bit easier to get the chapter
  attr_accessor :chapter

  def show?
    @chapter.published || owned?
  end
  ##
  # Users can create a new chapter if they own the story
  def new?
    owned?
  end

  def destroy?
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
