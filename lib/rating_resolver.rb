class RatingResolver
  def initialize(hsh)
    if hsh 
      @hash = Hash.new
      RATING_NAMES.each do |val|
        @hash[val] = to_boolean(hsh[val])
      end
    else
      @hash = {
        "adult" => false,
        "teen" => true,
        "everybody" => true
      }
    end
  end
  RATING_NAMES = Story.content_ratings.keys
  def resolve(collection=Story.all)
    puts "Filtering #{collection.inspect}"
    # First, resolve content ratings
    prepare_content_ratings
    s = collection.where(content_rating: @accepted_content_ratings)
    puts "Filtered: #{s.inspect}"
    return s
  end
  ##
  # Ammend the conditions we add to an arel query
  def ammend_to_arel(arel)
    stories = Story.arel_table
    prepare_content_ratings
    return arel.where(stories[:content_rating].in(@accepted_content_ratings))
  end
  def prepare_content_ratings
    @accepted_content_ratings = []
    @hash.each do |k, v|
      @accepted_content_ratings << k if v
    end
    @accepted_content_ratings.map!{|x| Story.content_ratings[x]}
  end
  private
  def to_boolean(name)
    if name.nil?
      return false
    end
    YAML.load(name.to_s)
  end
end
