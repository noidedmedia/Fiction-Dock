class CascadeStoryFranchisesForeignKey < ActiveRecord::Migration
  def change
    remove_foreign_key :story_franchises, :stories
    add_foreign_key :story_franchises, :stories, on_delete: :cascade
  end
end
