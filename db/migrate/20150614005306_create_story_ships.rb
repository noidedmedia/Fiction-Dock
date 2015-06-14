class CreateStoryShips < ActiveRecord::Migration
  def change
    create_table :story_ships do |t|
      t.references :story, index: true, foreign_key: true
      t.references :ship, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
