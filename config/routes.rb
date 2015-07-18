Rails.application.routes.draw do

  concern :publishable do
    member do
      post :publish
      delete :unpublish
      get :published
    end
  end
  
  resources :franchise_creation_requests do
    post 'accept', on: :member
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
    resources :chapters, concerns: [:publishable] do
      post 'read'
    end
  end

  resources :franchises do
    resources :characters
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
