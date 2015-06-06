class CascadeDeleteOfShips < ActiveRecord::Migration
  def change
    remove_foreign_key :ship_characters, :ships
  end
end
