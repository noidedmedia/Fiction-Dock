# TODO: REFACTOR THIS TO USE PARTIALS AND STUFF
json.extract! @story, :name, :blurb, :description, :id
json.user_url user_url(@story.user, format: :json)
json.chapters @story.chapters.published do |chapter|
  json.extract! chapter, :name, :id, :slug
end
