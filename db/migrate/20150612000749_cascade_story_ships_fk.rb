class CascadeStoryShipsFk < ActiveRecord::Migration
  def change
    remove_foreign_key :ships, :stories
    add_foreign_key :ships, :stories, on_delete: :cascade
  end
end
