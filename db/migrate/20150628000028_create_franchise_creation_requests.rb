class CreateFranchiseCreationRequests < ActiveRecord::Migration
  def change
    create_table :franchise_creation_requests do |t|
      t.references :user, index: true
      t.string :name
      t.text :description
      t.text :reason

      t.timestamps null: false
    end
    add_foreign_key :franchise_creation_requests, :users, on_delete: :cascade
  end
end
