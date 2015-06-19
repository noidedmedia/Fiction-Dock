class RatingResolver
  def initialize(hsh)
    @hash = Hash.new
    VALID_VALUES.each do |val|
      @hash[val] = to_boolean(hsh[val])
    end

  end

  VALID_VALUES = %w{adult everybody teen}
  def resolve

  end
  private
  def to_boolean(name)
    if name.nil?
      return false
    end
    YAML.load(name)
  end
end
