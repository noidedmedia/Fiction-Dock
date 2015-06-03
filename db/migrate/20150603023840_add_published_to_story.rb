class AddPublishedToStory < ActiveRecord::Migration
  def change
    add_column :stories, :published, :boolean, null: false, default: false
  end
end
