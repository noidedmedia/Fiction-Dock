class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.references :subject, polymorphic: true, index: true
      t.references :user, index: true
      t.integer :event, null: false
      t.timestamps null: false
    end
    add_foreign_key :notifications, :users, on_delete: :cascade
  end
end
