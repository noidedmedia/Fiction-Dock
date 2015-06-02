class AddPublishedToChapter < ActiveRecord::Migration
  def change
    add_column :chapters, :published, :boolean, null: false, default: false
  end
end
