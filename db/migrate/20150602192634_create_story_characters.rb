class CreateStoryCharacters < ActiveRecord::Migration
  def change
    create_table :story_characters do |t|
      t.references :story, index: true, foreign_key: true
      t.references :character, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
