json.array! @franchises do |fr|
  json.extract! fr, :name, :id, :slug
end
