module Publishable
  extend ActiveSupport::Concern

  def publish
    published = true
    self.save
  end

  def unpublish
    published = false
    self.save
  end
end
