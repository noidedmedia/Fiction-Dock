# == Schema Information
#
# Table name: reviews
#
#  id         :integer          not null, primary key
#  story_id   :integer
#  user_id    :integer
#  body       :text
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Review < ActiveRecord::Base
  belongs_to :story
  belongs_to :user
  validates :story, presence: true
  validates :user, presence: true
  validates :body, presence: true, length: {in: (600..100000)}
  validates :name, presence: true
end
