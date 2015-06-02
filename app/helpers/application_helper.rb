module ApplicationHelper
  def pretty_time(t)
    t.strftime("%l:%M %p %B %d, %Y")
  end

  ##
  # Used for page's HTML titles.
  # http://stackoverflow.com/a/3841549
  def title(page_title)
    content_for(:title) { page_title }
  end

end
