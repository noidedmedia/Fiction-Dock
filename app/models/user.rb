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
#  read_words             :integer
#

##
# A user is exactly what it says on the tin: somebody who uses FictionDock.
# We use `Devise` for our authentication, so check out their docs as well.
class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable
  has_many :comments
  has_many :stories
  has_many :favorite_stories # join table
  has_many :favorites, through: :favorite_stories,
    source: :story
  has_many :bookshelves
  has_many :franchise_users
  has_many :franchises, through: :francise_users
  has_many :subscriptions
  has_many :subscribed_stories, through: :subscriptions, class_name: "Story", source: :story
  has_many :notifications
  validates :name,
    presence: true,
    format: {with: /\A([[:alpha:]]+|\w+)\z/},
    uniqueness: {case_sensative: false},
    length: {in: 2..25}
  enum level: [:normal, :mod, :admin]

  def has_favorited?(story)
    favorites.include?(story)
  end

  def favorite!(story)
    favorites << story
  end

  def subscribe!(story)
    subscribed_stories << story
  end

  def mod_or_higher?
    level == "mod" || level == "admin"
  end
  ##
  # Mark a chapter as read by this user if it has not been already
  # update word count accordingly
  def read_chapter(chapter)
    with_lock do
      if ReadChapter.new(chapter: chapter,
                         user: self).save
        self.read_words += chapter.word_count
        self.save
      end
    end
  end
end
