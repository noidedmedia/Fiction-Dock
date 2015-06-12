class DefaultStoryEnumToZero < ActiveRecord::Migration
  def change
    change_column_default(:stories, :license, 0)
    change_column_default(:stories, :language, 0)
  end
end
