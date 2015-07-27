class CreateFavoriteStories < ActiveRecord::Migration
  def change
    create_table :favorite_stories do |t|
      t.references :story, index: true
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :favorite_stories, :users, on_delete: :cascade
    add_foreign_key :favorite_stories, :stories, on_delete: :cascade
  end
end
