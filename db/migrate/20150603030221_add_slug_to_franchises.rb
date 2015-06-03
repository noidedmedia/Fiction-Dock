class AddSlugToFranchises < ActiveRecord::Migration
  def change
    add_column :franchises, :slug, :string
    add_index :franchises, :slug, unique: true
  end
end
