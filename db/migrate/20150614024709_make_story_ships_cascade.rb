class MakeStoryShipsCascade < ActiveRecord::Migration
  def change
    remove_foreign_key :story_ships, :ships
    remove_foreign_key :story_ships, :stories
    add_foreign_key :story_ships, :stories, on_delete: :cascade
    add_foreign_key :story_ships, :ships, on_delete: :cascade
  end
end
