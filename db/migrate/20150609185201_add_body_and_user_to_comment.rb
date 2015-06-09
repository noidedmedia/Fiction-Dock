class AddBodyAndUserToComment < ActiveRecord::Migration
  def change
    add_reference :comments, :user, index: true
    add_column :comments, :body, :text
    add_foreign_key :comments, :users, on_delete: :cascade
  end
end
