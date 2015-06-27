class CharacterPolicy < ApplicationPolicy
  attr_accessor :user, :character

  def initialize(u, c)
    @character = c
    @user = u
  end

  def create?
    @user
  end

  def update?
    moderated?
  end

  def destroy?
    @user.level == "admin"
  end

  protected

  def moderated?
    @character.franchise.moderated_by?(@user) || @user.mod_or_higher?
  end

end
