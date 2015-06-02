json.array! @chapters.story_order do |chapter|
  json.extract! chapter, :name
  json.url story_chapter_url(@story, chapter, format: :json)
end
