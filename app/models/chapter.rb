class Chapter < ActiveRecord::Base
  scope :story_order, ->{ order(chap_num: :asc).where(published: true) }
  validates :name, presence: true
  belongs_to :story
  validates :story, presence: true
  validates :chap_num, numericality: {greater_than: 0}
  before_validation :fix_chap_num
  protected
  def fix_chap_num
    self.chap_num = story.chapters.story_order.last.chap_num + 1 unless self.chap_num
  end
end
