Rails.application.routes.draw do
  root to: proc { [200, {}, ['TaskFlow API']] }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :users do
    post 'login', to: 'sessions#create'
  end

  devise_for :users,
             path: '',
             path_names: {
               sign_in: 'login',
               sign_out: 'logout',
               registration: 'signup'
             },
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }

  get '/profile', to: 'users#profile'

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  resources :tasks

  resources :projects do
    resources :activities, only: [:index, :show, :create, :update, :destroy]
  end

end
