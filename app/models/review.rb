class Review < ActiveRecord::Base
  belongs_to :story
  belongs_to :user
  validates :story, presence: true
  validates :user, presence: true
  validates :body, length: {in: (300..100000)}
  validates :name, presence: true
end
