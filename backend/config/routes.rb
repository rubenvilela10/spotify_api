Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  # 
  namespace :api do
    get 'me', to: 'users#me'
    get '/home', to: 'home#index'
    get 'search', to: 'search#index'

    resources :artists, only: [:show]
    resources :albums, only: [:show]
    resources :tracks, only: [:show]

    namespace :auth do
      get 'spotify', to: 'spotify#redirect'
      get 'spotify/callback', to: 'spotify#callback', defaults: { format: :json }
    end
  end
end
