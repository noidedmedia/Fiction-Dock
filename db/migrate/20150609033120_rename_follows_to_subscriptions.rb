class RenameFollowsToSubscriptions < ActiveRecord::Migration
  def change
    rename_table :follows, :subscriptions
  end
end
