class MakeSexAndViolenceNotNull < ActiveRecord::Migration
  def change
    remove_column :stories, :sex
    remove_column :stories, :violence
    add_column :stories, :sex, :boolean, null: false, default: false
    add_column :stories, :violence, :boolean, null: false, default: false
  end
end
