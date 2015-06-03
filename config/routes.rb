Rails.application.routes.draw do
  
  resources :stories do
    resources :chapters
  end
  
  resources :franchises do
    resources :characters
    get 'stories', on: :member
  end
  resources :users, only: [:index, :show] do
    get 'stories', on: :member
  end

  devise_for :users, path: "accounts"
  
  root 'frontpage#index'

end
