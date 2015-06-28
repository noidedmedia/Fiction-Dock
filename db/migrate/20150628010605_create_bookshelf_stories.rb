class CreateBookshelfStories < ActiveRecord::Migration
  def change
    create_table :bookshelf_stories do |t|
      t.references :bookshelf, index: true
      t.references :story, index: true

      t.timestamps null: false
    end
    add_foreign_key :bookshelf_stories, :bookshelves, on_delete: :cascade
    add_foreign_key :bookshelf_stories, :stories, on_delete: :cascade
  end
end
