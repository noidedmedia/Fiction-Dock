class AddProperlyCascadingKeyForStoryCharacters < ActiveRecord::Migration
  def change
    remove_foreign_key :ship_characters, :characters
    add_foreign_key :ship_characters, :characters, on_delete: :cascade
    add_foreign_key :ship_characters, :ships, on_delete: :cascade
  end
end
