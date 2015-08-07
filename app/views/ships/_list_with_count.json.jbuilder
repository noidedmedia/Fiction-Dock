json.extract! ship, :id, :story_count
json.characters(ship.characters) do |c|
  json.partial! "characters/character", character: c
end
