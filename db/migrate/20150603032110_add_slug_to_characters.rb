class AddSlugToCharacters < ActiveRecord::Migration
  def change
    add_column :characters, :slug, :string
    add_index :characters, :slug, unique: true
  end
end
