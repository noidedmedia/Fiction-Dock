json.franchises(@story.franchises) do |f|
  json.extract! f, :id, :name
  json.characters(f.characters) do |c|
    json.extract! c, :name, :id, :franchise_id
  end
end

json.characters(@story.characters) do |c|
  json.extract! c, :id, :name, :franchise_id
end

json.ships(@story.ships) do |s|
  json.characters(s.characters) do |c|
    json.extract! c, :name, :id, :franchise_id
  end
end

json.translations do
  json.franchises_label t("#{i18npath}.franchises")
  json.franchises_placeholder t("#{i18npath}.franchise")
  json.add_a_new_franchise t("#{i18npath}.add_a_new_franchise")
  json.characters_label t("#{i18npath}.characters")
  json.characters_placeholder t("#{i18npath}.characters")
  json.add_a_new_character t("#{i18npath}.add_a_new_character")
  json.ships_label t("#{i18npath}.ships")
  json.ships_placeholder t("#{i18npath}.ships")
  json.add_a_new_ship t("#{i18npath}.add_a_new_ship")
  json.no_suggestions_found t("#{i18npath}.no_suggestions_found")
  json.remove t("#{i18npath}.remove")
  json.submit t("#{i18npath}.submit.#{action_name}")
end