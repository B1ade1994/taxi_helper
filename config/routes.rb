Rails.application.routes.draw do
  root 'welcome#index'

  get 'login', to: 'welcome#index'
  get 'register', to: 'welcome#index'
  get 'test', to: 'welcome#index'
  get 'info/agreement', to: 'welcome#index'
  get 'verify', to: 'welcome#index'
  get 'profile', to: 'welcome#index'

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      devise_for :users,
                 path: '',
                 path_names: {
                   sign_in: 'login',
                   sign_out: 'logout',
                   registration: 'register'
                 }
      post :verify, to: 'verify#create'
      put :verify, to: 'verify#update'

      put :profile, to: 'users#profile'
    end
  end
end
