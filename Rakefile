# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

RDoc::Task.new :documentation do |rdoc|
  rdoc.rdoc_file.include("README.rdoc", "app/**/*.rb", "lib/**/*.rb")
  rdoc.rdoc_dir = "doc"
  rdoc.main = "README.rdoc"
  rdoc.generator = "bootstrap"
  rdoc.title = "ImageHex Documentation"
  rdoc.options << "--all"
end

RDoc::Task.new :doc_coverage do |rdoc|
  rdoc.rdoc_files.include("app/**/*.rb")
  rdoc.rdoc_dir = "doc"
  rdoc.title = "ImageHex Documentation"
  rdoc.options << "-C"
  rdoc.options << "--all"
end

