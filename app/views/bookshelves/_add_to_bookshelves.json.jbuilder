json.bookshelves(current_user.bookshelves.without_story(@story)) do |b|
  json.extract! b, :name, :id
end

json.story do
  json.extract! @story, :name, :id
end

json.translations do
  json.add_to_bookshelves t("#{i18npath}.add_to_bookshelves")
end
