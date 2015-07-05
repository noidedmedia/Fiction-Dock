class ReviewPolicy < ApplicationPolicy
  def initialize(user, review)
    @user = user
    @review = review
  end

  def create?
    @user
  end

  def update?
    owned?
  end

  def destroy?
    owned?
  end

  def index?
    true
  end

  def show?
    true
  end

  protected
  def owned?
    @review.user == @user
  end
end
