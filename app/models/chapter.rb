class Chapter < ActiveRecord::Base
  belongs_to :story

  validates :story, presence: true
end
