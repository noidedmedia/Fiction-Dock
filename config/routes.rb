Rails.application.routes.draw do

  concern :publishable do
    member do
      post :publish
      delete :unpublish
      get :published
    end
  end

  concern :commentable do 
    resources :comments, only: [:create, :index]
  end
  concern :readable do
    post :read
  end

  concern :popularity_queryable do
    get 'popular', on: :collection
  end
  resources :franchise_creation_requests do
    post 'accept', on: :member
  end
  resources :franchise_creation_requests do
    post 'accept', on: :member
  end

  resources :ships, only: [:index, :show]

  resources :characters, only: [], concerns: [:popularity_queryable]

  resources :stories, concerns: [:publishable, :commentable] do
    # see if currently subscribed
    get 'subscribed'
    # subscribe if not currently subscribed
    post 'subscribe'
    # unsubscribe if currently subscribed
    delete 'unsubscribe' 
    get 'search', on: :collection
    member do
      get 'franchises'
      get 'ships'
      get 'characters'
      post 'favorite'
      delete 'unfavorite'
      get 'favorited'
    end
    resources :reviews
    resources :chapters, concerns: [:publishable, :readable] 
  end

  resources :franchises, concerns: [:popularity_queryable] do
    resources :characters do
      get 'stats', on: :member
    end
    get 'stats', on: :member
    get 'stories', on: :member
    get 'complete', on: :collection
    resources :users, controller: :franchise_users, except: [:show, :edit, :update]
  end

  resources :bookshelves, except: [:index, :new, :create] do
    member do 
      post 'add'
      delete 'remove'
      get 'contains'
    end
  end

  resources :characters do
    get 'stories', on: :member
  end

  resources :users, except: [:new, :create, :destroy] do
    get 'stories', on: :member
    resources :bookshelves, shallow: true
  end

  devise_for :users, path: "accounts"

  get '/about', to: "static_stuff#about"
  get '/rules', to: "static_stuff#rules"

  root 'frontpage#index'

end
