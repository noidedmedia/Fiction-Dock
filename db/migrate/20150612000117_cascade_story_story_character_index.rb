class CascadeStoryStoryCharacterIndex < ActiveRecord::Migration
  def change
    remove_foreign_key :story_characters, :stories
    add_foreign_key :story_characters, :stories, on_delete: :cascade
  end
end
