# == Schema Information
#
# Table name: chapters
#
#  id         :integer          not null, primary key
#  body       :text
#  chap_num   :integer
#  story_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string
#  published  :boolean          default(FALSE), not null
#

class Chapter < ActiveRecord::Base
  scope :story_order, ->{ order(chap_num: :asc).where(published: true) }
  validates :name, presence: true
  belongs_to :story
  validates :story, presence: true
  validates :chap_num, numericality: {greater_than: 0}
  before_validation :fix_chap_num
  protected
  def fix_chap_num
    latest_chap = story.chapters.story_order.last
    unless self.chap_num
      self.chap_num = if latest_chap
                        lastest_chap.chap_num + 1
                      else
                        1
                      end
    end
  end
end
