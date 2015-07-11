json.characters(@characters) do |character|
  json.extract! character, :id, :name, :slug, :description, :franchise_id
  json.url franchise_url(character.franchise_id, format: :json)
end
