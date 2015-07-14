json.extract! @franchise, :id, :name, :description, :slug
json.characters @franchise.characters do |character|
  json.extract! character, :created_at, :description, :franchise_id, :id, :name, :slug, :updated_at
end
