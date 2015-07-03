# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  name                   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  level                  :integer          default(0), not null
#  slug                   :string
#  content_pref           :jsonb
#

#
# A user is exactly what it says on the tin: somebody who uses FictionDock.
# We use `Devise` for our authentication, so check out their docs as well.
# 
# @attr [String] name this user's name
class User < ActiveRecord::Base

  extend FriendlyId
  friendly_id :name, use: :slugged
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :comments
  has_many :stories

  has_many :bookshelves
  has_many :franchise_users
  has_many :franchises, through: :francise_users
  has_many :subscriptions
  has_many :subscribed_stories, through: :subscriptions, class_name: "Story", foreign_key: "story_id"

  validates :name,
    presence: true,
    format: {with: /\A([[:alpha:]]+|\w+)\z/},
    uniqueness: {case_sensative: false},
    length: {in: 2..25}
  enum level: [:normal, :mod, :admin]

  def mod_or_higher?
    level == "mod" || level == "admin"
  end
end
