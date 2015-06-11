class AddSlugToChapters < ActiveRecord::Migration
  def change
    add_column :chapters, :slug, :string
    add_index :chapters, [:slug, :story_id], unique: true
  end
  def data
    Chapter.find_each(&:save)
  end
end
