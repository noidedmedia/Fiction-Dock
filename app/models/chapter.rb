##
# A chapter is a part of a story. It contains the actual text of that part,
# as well as a title. 
#
# It also has a `chap_num`, which is the index of this chapter in the story.
# This index is 1-based. 
class Chapter < ActiveRecord::Base
  scope :story_order, ->{ order(chap_num: :asc).where(published: true) }
  validates :name, presence: true
  belongs_to :story
  validates :story, presence: true
  validates :chap_num, numericality: {greater_than: 0}
  before_validation :fix_chap_num
  protected
  ##
  # If this chapter is not explicitly assigned an order, we append it to the
  # end of the last chapter.
  def fix_chap_num
    unless self.chap_num
    latest_chap = story.chapters.story_order.last
      self.chap_num = if latest_chap
                        lastest_chap.chap_num + 1
                      else
                        1
                      end
    end
  end
end
