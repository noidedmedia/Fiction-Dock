require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module FictionDock
  class Application < Rails::Application
    config.autoload_paths << Rails.root.join('lib')
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Suggested by Thoughtbot, compresses your content wit gzip.
    # https://robots.thoughtbot.com/content-compression-with-rack-deflater
    config.middleware.use Rack::Deflater

    # Add fonts to asset pipeline
    config.assets.paths << Rails.root.join("app", "assets", "fonts")

    # Add bower assets to asset pipeline
    config.assets.paths << Rails.root.join("vendor", "assets", "bower_components")

    # Needed for GitHub's Octicons
    # https://github.com/github/octicons/
    config.assets.precompile += %w(*.svg *.eot *.woff *.ttf)

    # Custom i18n routes.
    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}')]
  end
end
