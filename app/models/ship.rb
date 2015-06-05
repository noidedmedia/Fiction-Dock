class Ship < ActiveRecord::Base
  belongs_to :story
  has_many :ship_characters
  has_many :characters, through: :ship_characters
  attr_accessor :character_ids
  before_validation :save_character_ids

  protected
  def save_character_ids
    self.characters = Character.where(id: character_ids)
  end
end
