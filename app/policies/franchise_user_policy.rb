class FranchiseUserPolicy < ApplicationPolicy
  def initialize(user, fr)
    @user = user
    @fr = fr
  end

  def create?
    @user
  end
  
  def destroy? 
    @user.level == "admin"
  end
end
