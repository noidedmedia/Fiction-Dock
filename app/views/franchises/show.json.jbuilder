json.extract! @franchise, :id, :name, :description, :slug
json.characters @franchise.characters do |character|
  json.extract! character, :name, :id, :slug, :franchise_id
end
