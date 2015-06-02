json.extract! @franchise, :id, :name, :description
json.stories @franchise.stories do |story|
  json.name story.name
  json.blurb story.blurb
  json.url url_for(story)
end

