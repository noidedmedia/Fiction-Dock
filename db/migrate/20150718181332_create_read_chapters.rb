class CreateReadChapters < ActiveRecord::Migration
  def change
    create_table :read_chapters do |t|
      t.references :user, index: true
      t.references :chapter, index: true
    end

    add_foreign_key :read_chapters, :chapters, on_delete: :cascade
    add_foreign_key :read_chapters, :users, on_delete: :cascade
  end
end
