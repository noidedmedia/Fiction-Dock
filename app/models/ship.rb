class Ship < ActiveRecord::Base
  belongs_to :story
  has_many :ship_characters
  has_many :characters, through: :ship_characters
end
