# == Schema Information
#
# Table name: characters
#
#  id           :integer          not null, primary key
#  franchise_id :integer
#  name         :string
#  description  :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  slug         :string
#

##
# A character represents exactly what it says on the tin: a character in a 
# fictional work.
#
# Characters belong to a franchise. So "The Heavy" belongs to the franchise 
# "TF2". Characters can only belong to one franchise at once, so the various
# incarnations of King Arthur are considered seperate characters.
class Character < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
  ##
  # Franchise this character belongs to
  belongs_to :franchise
  ##
  # Join table: `Story` <-> `Characters`
  #
  # Allows us to place this character in multiple stories
  has_many :story_characters
  ##
  # Stories with this character in them
  has_many :stories, through: :story_characters
  validates :franchise, presence: true
  validates :name, presence: true, length: {in: (1..40)}, uniqueness: {case_sensative: false,
                                                scope: :franchise}
  validates :description, length: { maximum: 1500 }
end
