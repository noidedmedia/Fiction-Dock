##
# A class representing a story on the site.
#
# @attr [Array<Integer>] franchise_ids an array of franchise ids, to be resolved
#   into a real collection of franchises when the model saves
# 
# @attr [Array<Integer>] character_ids an array of character ids, to be
#   resolved into a real collection of franchises when the model saves.
#
# @attr [String] blurb a short description of the story, aka a "blurb"
#
# @attr [Text] description a long-form description of the story.
#
# @attr [String] name the name of the story
#
# @attr [Boolean] published a value indicating if the story is published.
#   When `false`, this story will not be displayed in any results.
#
class Story < ActiveRecord::Base
  include Commentable
  include Publishable
  ##
  # A scope of all stories ready for Display
  # @return [ActiveRecord::Relation<Story>] all stories that have been published
  scope :for_display, ->{where(published: true).order("created_at DESC")}
  
  validate :has_published_chapters
  validates :blurb, length: {in: (0..250)}
  validate :character_inclusion
  validates :name, length: {in: (2..100)}
  validates :description, length: {in: (10..1000)}
  validates :user, presence: true
  validates :franchises, presence: true
  validates :characters, presence: true
  ##
  # The user who wrote the story
  # @return [User]
  belongs_to :user

  has_many :chapters
  has_many :story_characters
  ##
  # All the characters in this story
  # @return [ActiveRecord::Relation<Character>]
  has_many :characters, through: :story_characters
  ##
  # Join table of `Story` to `Franchise`
  # Allows us to place this story within several franchises
  has_many :story_franchises
  ##
  # All the franchises our story takes place in
  # @return [ActiveRecord::Relation<Franchise>]
  has_many :franchises, through: :story_franchises
  ##
  # All the Ships in this story
  # @return [ActiveRecord::Relation<Ship>]
  has_many :ships, autosave: true, before_add: :set_parent_for_ship
  attr_accessor :franchise_ids
  attr_accessor :character_ids
 
 
  accepts_nested_attributes_for :ships, allow_destroy: true
  before_validation :resolve_character_ids
  before_validation :resolve_franchise_ids

  enum license: [:all_rights_reserved, :cc_zero, :cc_by, :cc_by_sa, :cc_by_nd, :cc_by_nc, :cc_by_nd_sa, :cc_by_nc_nd]
  enum language: [:en, :es]

  ##
  # My designer wanted to use `@story.author` in views
  # So this exists
  # @return [User] the author of this story
  def author
    user
  end

  ##
  # See if this story can be published
  # @returns [Boolean] if the story can be published
  def publishable?
    chapters.published.count > 0 
  end
  ##
  # Returns a localized list of all license options for use
  # with the select element on the Story page.
  #
  def self.license_attributes_for_select
    licenses.map do |license, k|
      [I18n.t("licenses.#{license}"), license]
    end
  end

  ##
  # Returns a localized list of all language options for use
  # with the select element on the Story page.
  #
  def self.language_attributes_for_select
    languages.map do |language, k|
      [I18n.t("languages.#{language}"), language]
    end
  end

  protected

  def has_published_chapters
    if published?
      errors.add(:chapters, "needs to have one published") unless publishable?
    end
  end
  def set_parent_for_ship(ship)
    ship.story ||= self
  end
  ##
  # Make sure that all our characters are in valid franchises
  def character_inclusion
    if characters.where.not(franchise_id: franchises.pluck(:id)).count > 0 
      errors.add(:characters, "Are not all within valid franchises")
    end
  end
  ##
  # Resolve the franchises in `franchise_ids` to the actual franchise objects
  def resolve_franchise_ids
    self.franchises = Franchise.where(id: franchise_ids) if franchise_ids && franchise_ids.count > 0
  end
  ##
  # Resolve the characters in `character_ids` to the actual character objects
  def resolve_character_ids
    self.characters = Character.where(id: character_ids) if character_ids && character_ids.count > 0
  end
end
