class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.references :user, index: true 
      t.references :story, index: true 
      t.timestamps null: false
    end
  end
end
