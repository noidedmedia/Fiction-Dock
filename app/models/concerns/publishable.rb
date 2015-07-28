module Publishable
  extend ActiveSupport::Concern
  def publish
    self.published = true
    save
    notify_published if respond_to? :notify_published
  end

  def unpublish
    self.published = false
    save
  end
end
