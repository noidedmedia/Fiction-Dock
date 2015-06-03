Rails.application.routes.draw do
  
  resources :stories do
    resources :chapters
  end
  
  resources :characters
  resources :franchises
  resources :users, only: [:index, :show] do
    get 'stories'
  end

  devise_for :users, path: "accounts"
  
  root 'frontpage#index'

end
