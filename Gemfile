ruby '2.2.3'
source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5'

# Redcarpet for Markdown
gem 'redcarpet'

gem 'will_paginate'

# Data migrations!
gem 'migration_data'

# Use Postgres
gem 'pg'

gem 'sanitize'

# Use SCSS for stylesheets
gem 'sass-rails'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier'

gem 'friendly_id'

gem 'pundit'

# For caching
gem 'rack-cache'
gem 'dalli'

gem 'devise'

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Fixes issues with JQuery and Turbolinks, read more: https://github.com/kossnocorp/jquery.turbolinks
gem 'jquery-turbolinks'

# React for Rails
gem 'react-rails'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'

# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0',          group: :doc

# Use unicorn as the app server
gem 'unicorn'


group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'quiet_assets'
  gem 'yard'
  gem 'yard-activerecord'
  gem 'annotate'

  # FontCustom for generating the icon font.
  # http://fontcustom.com/
  gem 'fontcustom'

  # Spring speeds up development by keeping your application running in the background.
  # Read more: https://github.com/rails/spring
  gem 'spring'
end


group :development, :test do
  gem 'rspec-rails'
  gem 'factory_girl_rails'
  gem 'faker'
  gem 'pry-rails'
  gem 'shoulda-matchers'
  gem 'database_cleaner'
end

group :test do
  gem "codeclimate-test-reporter", require: nil
end

group :production do
  gem 'rails_12factor'
end
