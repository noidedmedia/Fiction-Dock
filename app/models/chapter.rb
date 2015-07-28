##
# A chapter is a part of a story. It contains the actual text of that part,
# as well as a title. 
#
class Chapter < ActiveRecord::Base
  extend FriendlyId
  include Publishable
  friendly_id :name, use: :scoped, scope: [:story]
  ##
  # Returns a list of chapters by the order they will be in their story.
  # This essentially means that they are ordered by `chap_num`
  scope :published, ->{ where(published: true) }
  default_scope{ order("chap_num ASC") }
  validates :name, presence: true
  belongs_to :story
  validates :story, presence: true
  validates :chap_num, numericality: {greater_than: 0}
  validates :word_count, presence: true
  before_validation :fix_chap_num
  before_validation :sanitize_tags
  before_validation :save_word_count
  def notify_published
    attrs = story.subscribers
      .pluck(:id).map{|x| {user_id: x, subject: story, event: :subscribed_updated}}
    Notification.create(attrs)
  end
  def sanitize_tags
    self.body = Sanitize.fragment(self.body, Sanitize::Config::BASIC).gsub('&gt;','>')
  end

  def next_chapter
    @_next_chapter ||= story.chapters.where(chap_num: chap_num + 1).first
  end

  def prev_chapter
    @_prev_chapter ||= story.chapters.where(chap_num: chap_num - 1).first
  end
  
  protected
  def save_word_count
    ##
    # String::split by default uses $1. If $1 is empty, it uses /\s+/.
    # I did a test and found that passing /\s+/ is quite literally
    # an order of magnitude slower than just passing nothing. So we use 
    # .split with no arguments to split on whitespace, then find the count
    # to determine the word count.
    self.word_count = body.split.count
  end
  ##
  # If this chapter is not explicitly assigned an order, we append it to the
  # end of the last chapter.
  def fix_chap_num
    unless self.chap_num
    latest_chap = story.chapters.last
      self.chap_num = if latest_chap
                        latest_chap.chap_num + 1
                      else
                        1
                      end
    end
  end
end
