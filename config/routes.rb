Rails.application.routes.draw do
  devise_for :users, path: "auth"
  root 'frontpage#frontpage'
end
