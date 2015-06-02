class CreateFranchises < ActiveRecord::Migration
  def change
    create_table :franchises do |t|
      t.string :name
      t.text :description

      t.timestamps null: false
    end
  end
end
