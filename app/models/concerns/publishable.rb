module Publishable
  extend ActiveSupport::Concern
  def publish
    self.published = true
    save
  end

  def unpublish
    self.published = false
    save
  end
end
