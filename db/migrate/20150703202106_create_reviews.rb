class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.references :story, index: true
      t.references :user, index: true
      t.text :body
      t.string :name
      t.timestamps null: false
    end
    add_foreign_key :stories, :reviews, on_delete: :cascade
    add_foreign_key :users, :reviews, on_delete: :cascade
  end
end
