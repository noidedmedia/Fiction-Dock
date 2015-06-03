class Story < ActiveRecord::Base
  scope :for_display, ->{where(published: true).order("created_at DESC")}
  
  validates :name, length: {in: (2..100)}
  validates :description, length: {in: (10..1000)}
  validates :user, presence: true

  belongs_to :user
  has_many :chapters
  has_many :story_characters
  has_many :characters, through: :story_characters
  has_many :story_franchises
  has_many :franchises, through: :story_franchises

  attr_accessor :franchise_ids
  before_validation :resolve_franchise_ids
  validate :has_at_least_one_franchise
  protected

  def has_at_least_one_franchise
    errors.add(:franchises, "must have at least one") if franchises.length < 1
  end
  def resolve_franchise_ids
    self.franchises = Franchise.where(id: franchise_ids)
  end
  def author
    user
  end
end
