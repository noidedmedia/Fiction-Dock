class Story < ActiveRecord::Base
  validates :title, length: {in: (2..100)}
  validates :description, length: {in: (10..1000)}
end
