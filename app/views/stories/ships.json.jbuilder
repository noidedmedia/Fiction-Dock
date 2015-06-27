json.array! @ships do |ship|
  json.extract! ship, :id
  json.characters ship.characters, :name, :id, :franchise_id
end
