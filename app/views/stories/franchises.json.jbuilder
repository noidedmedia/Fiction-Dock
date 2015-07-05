json.franchises(@franchises) do |franchise|
  json.extract! franchise, :id, :name
  json.url franchise_url(franchise, format: :json)
end
