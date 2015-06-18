require 'faker'
require 'factory_girl'

task :env_checker do
  unless Rails.env.development?
    puts "Not in development environment, exiting!"
    exit 1
  end
end

namespace :db do
  desc "Fill database with sample data"
  task :populate => [:environment, :env_checker] do

    user_pool = []

    25.times {
      user_pool << FactoryGirl.create(:user,
        :name => Faker::Internet.user_name((Faker::Name.first_name + Faker::Name.last_name).to_s, ["_"]),
        :email => Faker::Internet.email(:name),
        :password => Faker::Internet.password(8, 18)
      )
    }
    puts "Users populated"


    25.times {
      name = Faker::Hacker.noun
      name.capitalize!

      FactoryGirl.create(:franchise,
        :name => name,
        :description => Faker::Lorem.sentence(rand(5...25)),
        :users => [user_pool.sample]
      )
    }
    puts "Franchises populated"


    25.times {
      FactoryGirl.create(:story,
        :name => Faker::Lorem.sentence(rand(1...10)),
        :description => Faker::Lorem.sentence(rand(5...25)),
        :user => user_pool.sample
      )
    }
    puts "Stories populated"

    Story.all.each do |story|
      3.times { FactoryGirl.create(:chapter, :story_id => story.id, :name => Faker::Lorem.words(4), :body => Faker::Lorem.paragraphs(rand(3..10)), :published => true ) }
    end
    puts "Chapters populated, stories published"

  end
end
