json.array! @popular do |p|
  json.extract! p, :name, :id, :slug, :stories_count
  json.url franchises_path(p)
end
