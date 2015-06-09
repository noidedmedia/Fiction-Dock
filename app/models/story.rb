##
# Story class. Represents a story on the site.
#
#== Relationships (excluding join tables)
# franchises:: all franchies this story falls under. This is used to oragnize
#              stories, crossovers, you name it. It's also used to make sure
#              character lists are accurate.
# characters:: the characters that are in this story. They can be from any 
#              franchie, as long as this story is also under that franchise.
# user:: the person who wrote this story.
# chapters:: individual chapters of this story. These contain the actual
#            content for the story.
class Story < ActiveRecord::Base
  include Commentable
  scope :for_display, ->{where(published: true).order("created_at DESC")}

  validates :name, length: {in: (2..100)}
  validates :description, length: {in: (10..1000)}
  validates :user, presence: true
  validates :franchises, presence: true
  validates :characters, presence: true
  belongs_to :user
  has_many :chapters
  has_many :story_characters
  has_many :characters, through: :story_characters
  has_many :story_franchises
  has_many :franchises, through: :story_franchises
  has_many :ships, autosave: true
  attr_accessor :franchise_ids
  attr_accessor :character_ids
  accepts_nested_attributes_for :ships, allow_destroy: true
  before_validation :resolve_character_ids
  before_validation :resolve_franchise_ids
  def author
    user
  end

  protected

  def resolve_franchise_ids
    self.franchises = Franchise.where(id: franchise_ids) if franchise_ids && franchise_ids.count > 0
  end

  def resolve_character_ids
    self.characters = Character.where(id: character_ids) if character_ids && character_ids.count > 0
  end
end
