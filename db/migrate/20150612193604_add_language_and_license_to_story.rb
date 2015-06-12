class AddLanguageAndLicenseToStory < ActiveRecord::Migration
  def change
    add_column :stories, :license, :integer, default: 1, null: false
    add_column :stories, :language, :integer, default: 1, null: false
  end
end
