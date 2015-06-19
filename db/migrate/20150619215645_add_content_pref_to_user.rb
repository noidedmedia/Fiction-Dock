class AddContentPrefToUser < ActiveRecord::Migration
  def change
    add_column :users, :content_pref, :jsonb
  end
end
