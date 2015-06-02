module ApplicationHelper
  def pretty_time(t)
    t.strftime("%l:%M %p %B %d, %Y")
  end

  ##
  # Helper used to determine if a link is to the page currently being viewed.
  def current(path)
    "current" if current_page?(path)
  end

  ##
  # Used for page's HTML titles.
  # http://stackoverflow.com/a/3841549
  def title(page_title)
    content_for(:title) { page_title }
  end

end
