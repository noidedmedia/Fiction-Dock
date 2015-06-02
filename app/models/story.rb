class Story < ActiveRecord::Base
  validates :name, length: {in: (2..100)}
  validates :description, length: {in: (10..1000)}
  validates :user, presence: true
  belongs_to :user
  has_many :story_characters
  has_many :characters, through: :story_characters
  has_many :story_franchises
  has_many :franchises, through: :story_franchises

  accepts_nested_attributes_for :franchises, reject_if: :new_record?
  validate :has_at_least_one_franchise
  protected
  def has_at_least_one_franchise
    errors.add(:franchises, "must have at least one") if franchises.length < 1
  end

end
