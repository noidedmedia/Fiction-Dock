class AddReadWordsToUser < ActiveRecord::Migration
  def change
    add_column :users, :read_words, :integer
  end
end
