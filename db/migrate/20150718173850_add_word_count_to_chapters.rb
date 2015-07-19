class AddWordCountToChapters < ActiveRecord::Migration
  def change
    add_column :chapters, :word_count, :integer
  end
end
