class CreateShips < ActiveRecord::Migration
  def change
    create_table :ships do |t|
      t.references :story, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
