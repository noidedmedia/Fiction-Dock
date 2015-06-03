module ApplicationHelper
  def pretty_time(t)
    t.strftime("%l:%M %p %B %d, %Y")
  end
  def markdown_parse(str)
    options = {
      filter_html: true,
      hard_wrap: true,
      link_attributes: {rel: 'nofollow', target: '_blank'}
    }
    extensions = {
      autolink: true,
      superscript: true,
    }
    renderer = Redcarpet::Render::HTML.new(options)
    markdown = Redcarpet::Markdown.new(renderer, extensions)
    markdown.render(str).html_safe
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
