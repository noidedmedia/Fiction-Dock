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
  before_validation :fix_chap_num

  def next_chapter
    @_next_chapter ||= story.chapters.where(chap_num: chap_num + 1).first
  end

  def prev_chapter
    @_prev_chapter ||= story.chapters.where(chap_num: chap_num - 1).first
  end
  
  protected
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
