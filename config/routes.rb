Rails.application.routes.draw do
  resources :characters
  resources :franchises
  devise_for :users, path: "auth"
  root 'frontpage#frontpage'
end
