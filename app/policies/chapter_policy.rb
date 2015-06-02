class ChapterPolicy < ApplicationPolicy
  def initialize(user, chapter)
    @user = user
    @chapter = chapter
  end
  attr_accessor :chapter
  def new?
    owned?
  end

  def edit?
    owned?
  end

  def create?
    owned?
  end

  def update?
    owned?
  end
  protected
  def owned?
    @chapter.story.user == @user
  end
end
