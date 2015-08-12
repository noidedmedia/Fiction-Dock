json.franchises(@story.franchises) do |f|
  json.extract! f, :id, :name
  json.characters(f.characters) do |c|
    json.extract! c, :name, :id, :franchise_id
  end
end
json.characters(@story.characters) do |c|
  json.extract! c, :id, :name, :franchise_id
end

json.ships(@story.ships) do |s|
  json.characters(s.characters) do |c|
    json.extract! c, :name, :id, :franchise_id
  end
end
