class Searcher
  def initialize(hash)
    @hash = hash
    prepare_hash
  end
  
  def resolve
    @query = stories.project(stories[Arel.star]).group(stories[:id])
    resolve_ship_chars if @ship_chars && @ship_chars.length > 0
    resolve_characters if @chars && @chars.length > 0 
    Story.find_by_sql(@query.to_sql)
  end
  attr_reader :query
  protected
  def prepare_hash
    load_ship
    load_chars
  end

  def load_ship
    @ship_chars = @hash["ship"]
    if @ship_chars
      @ship_chars = @ship_chars.split(",").map!(&:to_i)
    end
  end

  def load_chars
    @chars = @hash["characters"]
    if @chars
      @chars = @chars.split(",").map!(&:to_i)
    end
  end
  def resolve_characters
    @query = @query
      .join(story_characters).on(story_characters[:story_id].eq(stories[:id]))
      .join(characters).on(characters[:id].eq(story_characters[:character_id]))
      .where(characters[:id].in(@chars))
      .having(Arel.sql("COUNT(DISTINCT characters)").eq(@chars.length))
  end
  def resolve_ship_chars
    @query = @query
      .join(ships).on(ships[:story_id].eq(stories[:id]))
      .join(ship_characters).on(ship_characters[:ship_id].eq(ships[:id]))
      .join(Arel.sql("INNER JOIN characters as shipchars on shipchars.id = ship_characters.character_id"))
      .where(Arel.sql("shipchars.id").in(@ship_chars))
      .having(Arel.sql("COUNT(DISTINCT shipchars)").eq(@ship_chars.count))
  end
  private
  def ship_characters
    @_ship_charactrs ||= ShipCharacter.arel_table
  end
  def story_characters
    @_story_characters ||= StoryCharacter.arel_table
  end
  def stories
    @_stories ||= Story.arel_table
  end

  def ships
    @_ships ||= Ship.arel_table
  end

  def characters
    @_characters ||= Character.arel_table
  end

end
