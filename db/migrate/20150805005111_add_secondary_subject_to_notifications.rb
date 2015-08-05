class AddSecondarySubjectToNotifications < ActiveRecord::Migration
  def change
    add_reference :notifications, :secondary_subject, polymorphic: true
    add_index :notifications, [:secondary_subject_id, :secondary_subject_type],  name: "secondary_subject_index"
  end
end
