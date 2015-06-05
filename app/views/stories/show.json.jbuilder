# TODO: REFACTOR THIS TO USE PARTIALS AND STUFF
json.extract! @story, :name, :blurb, :description, :id
json.user_url user_url(@story.user, format: :json)
json.chapters @story.chapters.story_order do |chapter|
  json.extract! chapter, :name, :id, :slug
end
json.ships @story.ships.includes(:characters) do |ship|
  json.extract! ship, :id
  json.characters ship.characters do |character|
    json.extract! character, :name, :id, :slug
  end
end

json.franchises @story.franchises.includes(:characters) do |franchise|
  json.extract! franchise, :name, :id, :slug
  json.url franchise_url(franchise, format: :json)
  json.characters franchise.characters do |character|
    json.extract! character, :name, :id, :slug, :franchise_id
  end
end
json.characters @story.characters.includes(:franchise) do |character|
  json.extract! character, :name, :id, :slug
  json.url franchise_character_url(character.franchise, character, format: :json)
end
