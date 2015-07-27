class RemoveKindFromBookshelves < ActiveRecord::Migration
  def change
    remove_column :bookshelves, :kind
  end
end
