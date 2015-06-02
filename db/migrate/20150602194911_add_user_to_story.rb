class AddUserToStory < ActiveRecord::Migration
  def change
    add_reference :stories, :user, index: true, foreign_key: true
  end
end
