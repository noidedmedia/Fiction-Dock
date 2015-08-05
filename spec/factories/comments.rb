# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  commentable_id   :integer
#  commentable_type :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :integer
#  body             :text
#

FactoryGirl.define do
  factory :comment do
    commentable { FactoryGirl.create(:story)}
    user
  end

end
