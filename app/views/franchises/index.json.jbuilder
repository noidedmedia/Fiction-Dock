json.array!(@franchises) do |franchise|
  json.extract! franchise, :id, :name, :description
  json.url franchise_url(franchise, format: :json)
end

