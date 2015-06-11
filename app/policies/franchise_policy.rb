class FranchisePolicy < ApplicationPolicy
  def initialize(user, franchise)
    @user = user
    @franchise = franchise
  end

  ##
  # Mods and admins are allowed to create
  def create?
    @user.mod_or_higher?
  end

  def update?
    admined?
  end
  protected
  def admined?
    @franchise.moderated_by? @user || @user.mod_or_higher?
  end
end
