Rails.application.routes.draw do 
  get 'static_stuff/about'

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
    resources :chapters, concerns: [:publishable]

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

  get '/about', to: "static_stuff#about"

  root 'frontpage#index'

end
