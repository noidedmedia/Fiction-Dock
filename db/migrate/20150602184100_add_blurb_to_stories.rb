class AddBlurbToStories < ActiveRecord::Migration
  def change
    add_column :stories, :blurb, :string
  end
end
