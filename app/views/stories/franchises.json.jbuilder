json.array! @franchises do |franchise|
  json.extract! franchise, :id, :name
  json.characters franchise.characters, :name, :id, :franchise_id
end
