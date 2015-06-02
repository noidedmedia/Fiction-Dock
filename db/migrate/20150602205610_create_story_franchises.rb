class CreateStoryFranchises < ActiveRecord::Migration
  def change
    create_table :story_franchises do |t|
      t.references :story, index: true, foreign_key: true
      t.references :franchise, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
