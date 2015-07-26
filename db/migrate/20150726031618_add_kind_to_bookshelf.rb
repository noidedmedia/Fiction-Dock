class AddKindToBookshelf < ActiveRecord::Migration
  def change
    add_column :bookshelves, :kind, :integer, default: 0, null: false
  end
end
