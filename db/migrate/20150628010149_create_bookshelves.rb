class CreateBookshelves < ActiveRecord::Migration
  def change
    create_table :bookshelves do |t|
      t.string :name
      t.text :description
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :bookshelves, :users, on_delete: :cascade
  end
end
