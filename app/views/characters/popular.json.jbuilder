json.array! @popular do |p|
  json.extract! p, :name, :id, :slug, :stories_count, :franchise_id
  json.url franchise_characters_url(p.franchise, p)
end
