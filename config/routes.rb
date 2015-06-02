Rails.application.routes.draw do
  
  
  resources :stories do
    resources :chapters
  end
  resources :characters
  resources :franchises
  resources :users

  devise_for :users, path: "accounts"
  root 'frontpage#frontpage'
end
