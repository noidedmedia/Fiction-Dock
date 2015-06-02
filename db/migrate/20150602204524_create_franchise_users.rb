class CreateFranchiseUsers < ActiveRecord::Migration
  def change
    create_table :franchise_users do |t|
      t.references :user, index: true, foreign_key: true
      t.references :franchise, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
