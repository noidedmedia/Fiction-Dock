class FranchiseCreationRequestPolicy < ApplicationPolicy
  def initialize(user, req)
    @user = user
    @req = req
  end
  class Scope < Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
      puts @scope.inspect
    end
    def resolve
      if @user.admin?
        scope.all
      else
        scope.where(user: @user)
      end
    end
  end
  def create?
    @user
  end

  def accept?
    @user.mod_or_higher?
  end

  def destroy?
    @user.mod_or_higher? || @req.user == @user
  end

end
