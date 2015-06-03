# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment',  __FILE__)

require 'dalli'
require 'rack/cache'

use Rack::Cache,
  :verbose     => true,
  :metastore   => "memcached://localhost:11211/meta",
  :entitystore => "memcached://localhost:11211/body"

use Rack::Deflater

run Rails.application
