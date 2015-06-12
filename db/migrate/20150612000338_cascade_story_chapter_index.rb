class CascadeStoryChapterIndex < ActiveRecord::Migration
  def change
    remove_foreign_key :chapters, :stories
    add_foreign_key :chapters, :stories, on_delete: :cascade
  end
end
