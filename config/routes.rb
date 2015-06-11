Rails.application.routes.draw do 
  resources :stories do
    # see if currently subscribed
    get 'subscribed'
    # subscribe if not currently subscribed
    post 'subscribe'
    # unsubscribe if currently subscribed
    delete 'unsubscribe'
    resources :chapters
  end

  resources :franchises do
    resources :characters
    get 'stories', on: :member
    get 'complete', on: :collection
    resources :users, controller: :franchise_users, except: [:show, :edit, :update]
  end
  resources :users, only: [:index, :show] do
    get 'stories', on: :member
  end

  devise_for :users, path: "accounts"

  root 'frontpage#index'

end
