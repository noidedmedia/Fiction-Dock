class BookshelfPolicy < ApplicationPolicy
  def initialize(user, bookshelf)
    @user = user
    @bookshelf = bookshelf
  end

  def add?
    owned?
  end

  def delete?
    owned?
  end

  def remove?
    owned?
  end

  def contains?
    owned?
  end

  def show?
    true
  end

  def index?
    true
  end
  def create?
    owned?
  end

  def update?
    owned?
  end

  def destroy?
    owned?
  end
  protected
  def owned?
    @bookshelf.user == @user
  end
end
