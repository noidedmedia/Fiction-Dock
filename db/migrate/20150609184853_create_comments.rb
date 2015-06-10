class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.references :commentable, polymorphic: true

      t.timestamps null: false
    end
  end
end