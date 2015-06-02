class CreateCharacters < ActiveRecord::Migration
  def change
    create_table :characters do |t|
      t.references :franchise, index: true, foreign_key: true
      t.string :name
      t.text :description

      t.timestamps null: false
    end
  end
end
