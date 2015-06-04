# == Schema Information
#
# Table name: franchises
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  slug        :string
#

class Franchise < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_many :story_franchises
  has_many :stories, through: :story_franchises
  has_many :characters
end
