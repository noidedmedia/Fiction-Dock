Rails.application.routes.draw do
  resources :stories do
    resources :chapters
  end
  resources :characters
  resources :franchises
  devise_for :users, path: "auth"
  root 'frontpage#frontpage'
end
