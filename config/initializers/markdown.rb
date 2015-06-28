module ActionView
  module Template::Handlers
    class Markdown
      class_attribute :default_format
      self.default_format = Mime::HTML

      def call(template)
        @markdown ||= Redcarpet::Markdown.new(Redcarpet::Render::HTML,
                                              autolink: true,
                                              space_after_headers: true,
                                              fenced_code_blocks: true)
        "#{@markdown.render(template.source).inspect}.html_safe"
      end
    end
  end
end
ActionView::Template.register_template_handler(
  :md, ActionView::Template::Handlers::Markdown.new)
