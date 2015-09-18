class FranchisePolicy < ApplicationPolicy
  attr_accessor :user, :franchise

  ##
  # Set up with a user and a franchise
  def initialize(user, franchise)
    @user = user
    @franchise = franchise
  end

  def stats?
    true
  end

  ##
  # Mods and admins are allowed to create
  def create?
    @user.mod_or_higher?
  end

  def update?
    admin?
  end

  protected
  
  def admin?
    if @user
      @franchise.moderated_by?(@user) || @user.mod_or_higher?
    end
  end
end
