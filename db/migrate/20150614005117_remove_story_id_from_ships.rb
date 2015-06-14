class RemoveStoryIdFromShips < ActiveRecord::Migration
  def change
    remove_column :ships, :story_id
  end
end
