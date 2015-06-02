class ChangeChapterTitleToChapterName < ActiveRecord::Migration
  def change
    remove_column :chapters, :title
    add_column :chapters, :name, :string
  end
end
