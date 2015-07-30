# == Schema Information
#
# Table name: favorite_stories
#
#  id         :integer          not null, primary key
#  story_id   :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class FavoriteStory < ActiveRecord::Base
  belongs_to :story
  belongs_to :user
end
