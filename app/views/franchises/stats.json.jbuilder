json.extract! @franchise, :name, :id, :slug
json.characters @characters do |c|
  json.extract! c, :name, :id, :stories_count
  json.franchise_id @franchise.id
end
json.ships_by_frequency @ships_by_frequency, partial: "ships/list_with_count", as: :ship
json.foreign_ships @foreign_ships, partial: "ships/list_with_count", as: :ship
