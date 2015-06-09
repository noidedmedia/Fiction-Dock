# == Schema Information
#
# Table name: stories
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  blurb       :string
#  user_id     :integer
#  published   :boolean          default(FALSE), not null
#

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
