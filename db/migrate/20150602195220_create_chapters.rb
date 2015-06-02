class CreateChapters < ActiveRecord::Migration
  def change
    create_table :chapters do |t|
      t.text :body
      t.string :title
      t.integer :chap_num
      t.references :story, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
