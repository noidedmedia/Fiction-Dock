##
# Default policy
class ApplicationPolicy
  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end
    attr_accessor :user
    attr_accessor :scope
  end
  
  ##
  # Default initializer
  def initialize(user, record)
    @user = user
    @record = record
  end

  ##
  # Indexes are public by default
  def index?
    true
  end

  ##
  # by default, you can view
  def show?
    true
  end

  ##
  # By default, disallow creation
  def create?
    false
  end

  ##
  # Only allow new if we can create
  def new?
    create?
  end

  ##
  # BY default, disallow udpate
  def update?
    false
  end

  ##
  # Only allow edit if we can update
  def edit?
    update?
  end

  ## 
  # By default, disallow destroy
  def destroy?
    false
  end
end
