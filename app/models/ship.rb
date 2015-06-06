class Ship < ActiveRecord::Base
  belongs_to :story, inverse_of: :ships
  has_many :ship_characters, autosave: true
  has_many :characters, through: :ship_characters
  attr_accessor :character_ids
  accepts_nested_attributes_for :ship_characters, allow_destroy: true
  before_validation :save_character_ids
  # We have to validate the ship_characters because of how the relation
  # works.
  validates :ship_characters, presence: true, length: {minimum: 2}
  protected
  def save_character_ids
    return unless character_ids
    characters.try :each do |c|
      c.mark_for_destruction
    end
    character_ids.each do |id|
      c = ship_characters.build(character_id: id)
    end
  end
end
