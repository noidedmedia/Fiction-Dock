class Character < ActiveRecord::Base
  belongs_to :franchise
  has_many :story_characters
  has_many :stories, through: :characters
  validates :franchise, presence: true
  before_save :resolve_franchise

  attr_accessor :franchise_name
  protected
  def resolve_franchise
    franchise = Franchise.where(name: franchise_name).first if francise_name
  end
end
