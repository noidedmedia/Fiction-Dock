json.extract! story, :name, :id, :description, :blurb
json.url story_url(story, format: :json)
json.user do
  json.partial! 'users/user', user: story.user unless @user
end
