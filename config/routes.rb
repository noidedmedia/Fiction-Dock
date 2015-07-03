Rails.application.routes.draw do

  concern :publishable do
    member do
      post :publish
      delete :unpublish
      get :published
    end
  end

  resources :stories, concerns: [:publishable] do
    # see if currently subscribed
    get 'subscribed'
    # subscribe if not currently subscribed
    post 'subscribe'
    # unsubscribe if currently subscribed
    delete 'unsubscribe'
    get 'search', on: :collection
    get 'franchises', on: :member
    get 'ships', on: :member
    get 'characters', on: :member
    resources :chapters, concerns: [:publishable]
  end

  resources :franchises do
    resources :characters
    get 'stories', on: :member
    get 'complete', on: :collection
    resources :users, controller: :franchise_users, except: [:show, :edit, :update]
  end

  resources :characters do
    get 'stories', on: :member
  end

  resources :users, except: [:new, :create, :destroy] do
    get 'stories', on: :member
    resources :bookshelves do
      post 'add'
      delete 'remove'
    end
  end

  devise_for :users, path: "accounts"

  get '/about', to: "static_stuff#about"

  root 'frontpage#index'

end
