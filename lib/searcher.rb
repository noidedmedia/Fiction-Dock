class Searcher
  def initialize(hash, content: nil)
    @content = content
    @hash = hash
    @chars = hash["characters"]
    @ship_chars = hash["ship"]
  end
  
  def resolve(content=nil, page:nil)
    @query = stories.project(stories[Arel.star]).group(stories[:id])
    resolve_ship_chars if @ship_chars && @ship_chars.length > 0
    resolve_characters if @chars && @chars.length > 0
    resolve_content
    resolve_published
    if page
      Story.paginate_by_sql(@query.to_sql, page: page)
    else
      Story.find_by_sql(@query.to_sql)
    end
  end
  attr_reader :query
  protected

  def resolve_published
    @query = @query.where(stories[:published].eq(true))
  end

  def resolve_content
     #@query = RatingResolver.new(@content).ammend_to_arel(@query)
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
      .join(story_ships).on(story_ships[:story_id].eq(stories[:id]))
      .join(ships).on(ships[:id].eq(story_ships[:ship_id]))
      .join(ship_characters).on(ship_characters[:ship_id].eq(ships[:id]))
      .join(Arel.sql("INNER JOIN characters as shipchars on shipchars.id = ship_characters.character_id"))
      .where(Arel.sql("shipchars.id").in(@ship_chars))
      .having(Arel.sql("COUNT(DISTINCT shipchars)").eq(@ship_chars.count))
  end
  private
  def story_ships
    @_story_ships ||= StoryShip.arel_table
  end

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
