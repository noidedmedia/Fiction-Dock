class RemoveNullLevelFromUsers < ActiveRecord::Migration
  def change
    change_column :users, :level, :integer, null: false, default: 0
  end
end
