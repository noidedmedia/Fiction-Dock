Rails.application.routes.draw do
  
  resources :stories do
    resources :chapters, except: [:index]
  end
  
  resources :characters
  resources :franchises
  resources :users

  devise_for :users, path: "accounts"
  
  root 'frontpage#index'

end
