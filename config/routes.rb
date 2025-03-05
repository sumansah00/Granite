# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    namespace :api do
      namespace :v1 do
        resources :tasks, except: %i[new edit], param: :slug
        resources :users, only: %i[index create]
        resource :session, only: :create
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
