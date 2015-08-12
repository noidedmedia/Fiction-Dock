class ValidateReadWords < ActiveRecord::Migration
  def change
    change_column :users, :read_words, :integer, default: 0, null: false
  end
end
