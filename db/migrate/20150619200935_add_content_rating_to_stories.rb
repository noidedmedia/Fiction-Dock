class AddContentRatingToStories < ActiveRecord::Migration
  def change
    add_column :stories, :content_rating, :integer, null: false, default: 0
    add_column :stories, :sex, :integer
    add_column :stories, :violence, :integer
  end
end
