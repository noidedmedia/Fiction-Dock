json.partial! 'character', character: @character
json.ships_by_frequency @ships_by_frequency, partial: "ships/list_with_count", as: :ship
json.foreign_ships @foreign_ships, partial: "ships/list_with_count", as: :ship
