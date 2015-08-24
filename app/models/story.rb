##
# A class representing a story on the site.
class Story < ActiveRecord::Base
  include Commentable
  include Publishable
  ##
  # A scope of all stories ready for Display
  # @return [ActiveRecord::Relation<Story>] all stories that have been published
  scope :for_display, ->{where(published: true).order("created_at DESC")}
  enum content_rating: [:everybody, :teen, :adult]
  validate :has_published_chapters
  validates :blurb, length: {in: (0..250)}
  validate :character_inclusion
  validates :content_rating, presence: true
  validates :name, length: {in: (2..100)}
  validates :description, length: {in: (10..1000)}
  validates :user, presence: true
  validates :franchises, presence: true
  validates :characters, presence: true
  belongs_to :user

  has_many :subscriptions
  has_many :subscribers, through: :subscriptions,
    class_name: "User", source: :user
  has_many :reviews
  has_many :notifications, as: :subject
  has_many :chapters
  has_many :story_characters
  has_many :bookshelf_stories
  has_many :bookshelves, through: :bookshelf_stories
  has_many :favorite_stories # join table
  ##
  # All the characters in this story
  # @return [ActiveRecord::Relation<Character>]
  has_many :characters, through: :story_characters
  ##
  # Join table of `Story` to `Franchise`
  # Allows us to place this story within several franchises
  has_many :story_franchises
  has_many :franchises, through: :story_franchises
  has_many :story_ships, autosave: true
  has_many :ships, through: :story_ships
  attr_accessor :ship_attrs
  attr_accessor :franchise_ids
  attr_accessor :character_ids
  before_validation :resolve_character_ids
  before_validation :resolve_franchise_ids
  before_validation :save_ship_attrs
  enum license: [:all_rights_reserved, :cc_zero, :cc_by, :cc_by_sa, :cc_by_nd, :cc_by_nc, :cc_by_nc_nd]
  enum language: [:en, :es]
  ##
  # The total number of words in this story
  def total_word_count
    chapters.map(&:count).collect(:+)
  end
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
    chapters.to_a.select(&:published?).length > 0
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

  ##
  # Returns a localized list of all rating options for use
  # with the select element on the Story page.
  #
  def self.rating_attributes_for_select
    content_ratings.map do |rating, k|
      [I18n.t("ratings.#{rating}"), rating]
    end
  end

  ########################
  # METHODS TO SELECT BY #
  ########################
  DEFAULT_CONTENT = {
    "teen" => true,
    "everybody" => true
  }

  def self.with_franchises(*franchises)
    c = if franchises[0].is_a? Array
          franchises[0]
        else
          franchises
        end
    c.reduce(all) do |memo, franchise|
      memo.with_franchise(franchise)
    end 
  end
  def self.with_franchise(franchise)
    where(id: franchise.stories)
  end
  def self.with_characters(*characters)
    ##
    # let the user pass an array or a comma-seperated list
    c = if characters[0].is_a? Array
          characters[0]
        else
          characters
        end
    c.reduce(all) do |memo, character|
      memo.with_character(character)
    end
  end

  def self.with_character(character)
    where(id: character.stories)
  end

  def self.for_content(content=DEFAULT_CONTENT)
    content = DEFAULT_CONTENT unless content # handle nil being passed
    q = all
    q = q.without_adult unless content["adult"]
    q = q.without_teen unless content["teen"]
    q = q.without_everybody unless content["everybody"]
    q
  end

  def self.without_adult
    where.not(content_rating: content_ratings[:adult])
  end

  def self.without_teen
    where.not(content_rating: content_ratings[:teen])
  end

  def self.without_everybody
    where.not(content_rating: content_rating[:everybody])
  end

  def self.by_favorites(range=(24.hours.ago..DateTime.now))
    all.joins(:favorite_stories)
      .references(:favorite_stories)
      .where(favorite_stories: {created_at: range})
      .group('stories.id')
      .order('COUNT(favorite_stories) DESC')
  end

  protected
 
  ##
  # TODO: make this less awful
  def save_ship_attrs
    return unless ship_attrs
    c_ids = ship_attrs.map!{|x| x["character_ids"]}
    self.ships = c_ids.map!{|x| Ship.find_or_create_by_character_ids(x)}
    self.ships.map(&:save!)
  end


  def has_published_chapters
    if published?
      errors.add(:chapters, "needs to have one published") unless publishable?
    end
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
    self.characters = Character.where(id: character_ids) unless character_ids.blank?
  end
end
