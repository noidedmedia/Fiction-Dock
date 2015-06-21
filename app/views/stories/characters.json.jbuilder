json.array! @characters do |character|
  json.extract! character, :name, :id, :franchise_id
end
