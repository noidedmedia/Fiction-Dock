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

class Character < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
  belongs_to :franchise
  has_many :story_characters
  has_many :stories, through: :story_characters
  validates :franchise, presence: true
  validates :name, presence: true, uniqueness: {case_sensative: false}
end
