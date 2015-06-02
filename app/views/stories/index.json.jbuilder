json.array!(@stories) do |story|
  json.extract! story, :id, :name, :description, :blurb
  json.url url_for(story)
end

