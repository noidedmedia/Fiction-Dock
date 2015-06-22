##
# Helpers we may need in all views
module ApplicationHelper
  ##
  # Properly format a Time
  # 7:21 PM June 14, 2015
  def pretty_time(t)
    t.strftime("%l:%M %p %B %d, %Y")
  end

  ##
  # Properly format a Date
  # June 14, 2015
  def pretty_date(t)
    t.strftime("%B %d, %Y")
  end

  ##
  # Parse markdown, return HTML
  def markdown_parse(str)
    options = {
      filter_html: true,
      hard_wrap: true,
      link_attributes: {rel: 'nofollow', target: '_blank'},
      no_styles: true,
      no_images: true,
      with_toc_data: true,
      no_intra_emphasis: true,
      safe_links_only: true
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

  ##
  # Pagination helper
  # Adds the "pagination" CSS class to the main pagination div, and ensures
  # that the collecton exists and is not empty before displaying anything.
  def paginate(collection, options={})
    options[:class] ||= 'pagination'
    options[:link_separator] ||= ''
    will_paginate(collection, options) if collection && !collection.empty?
  end

end
