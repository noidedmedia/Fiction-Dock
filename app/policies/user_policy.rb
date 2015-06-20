class UserPolicy < ApplicationPolicy
  def initialize(user, euser)
    @user = user
    @esuer = euser
  end

  def update?
    @user == @esuer || @user.kind == "admin"
  end
end
