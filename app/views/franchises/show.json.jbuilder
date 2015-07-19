json.extract! @franchise, :id, :name, :description, :slug
json.characters @franchise.characters do |character|
  if character.blank?
    json.null!
  else
    json.extract! character, :created_at, :description, :franchise_id, :id, :name, :slug, :updated_at
  end
end
