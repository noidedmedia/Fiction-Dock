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

  ##
  # Users can view a chapter if the chapter is published or if they own it
  def show?
    @chapter.published || owned?
  end
  
  ##
  # Users can check if a chapter is published only if they own the story
  def published?
    owned?
  end

  ##
  # Users can publish a chapter if they own the story
  def publish?
    owned?
  end

  ##
  # Users can unpublish a chapter if they own the story
  def unpublish?
    owned?
  end

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
  # Users can update chapters if they own a story
  def update?
    owned?
  end

  ## 
  # Users can destroy chapters if they own a story
  def destroy?
    owned?
  end

  protected
  
  def owned?
    @chapter.story.user == @user
  end
end
