json.extract! @story, :name, :blurb, :description
json.user_url url_for(@story.user, format: :json)
json.chapters @story.chapters do |chapter|
  json.name chapter.name
  json.url url_for(chapter, format: json)
end
