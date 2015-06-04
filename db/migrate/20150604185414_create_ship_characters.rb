class CreateShipCharacters < ActiveRecord::Migration
  def change
    create_table :ship_characters do |t|
      t.references :ship, index: true, foreign_key: true
      t.references :character, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
