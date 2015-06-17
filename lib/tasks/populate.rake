require 'faker'

task :env_checker do
  unless Rails.env.development?
    puts "Not in development environment, exiting!"
    exit 1
  end
end

namespace :db do
  desc "Fill database with sample data"
  task :populate => [:environment, :env_checker] do
    25.times do |n|
      username = Faker::Internet.user_name(Faker::Name.first_name + "_" + Faker::Name.last_name)
      email = Faker::Internet.email(username)
      password = Faker::Internet.password(8, 18)
      User.create!(:name => username,
                   :email => email,
                   :password => password)
    end
    puts "Users populated"

    25.times do |n|
      name = Faker::Hacker.noun + " " + Faker::Hacker.verb
      name.capitalize!

      # Randomly generated word count value
      description = Faker::Lorem.sentence(rand(5...25))
      user = User.order('random()').first.name

      Franchise.create!(:name => name,
                        :description => description)
    end
    puts "Franchises populated"
  end
end
