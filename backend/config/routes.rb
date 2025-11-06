Rails.application.routes.draw do
  # Active Storage routes for image serving
  if defined?(ActiveStorage)
    resolve("ActiveStorage::Blob") { |blob, options| route_for(:rails_blob, blob, options) }
    resolve("ActiveStorage::Attachment") { |attachment, options| route_for(:rails_blob, attachment.blob, options) }
  end

  # API versioning - v1/ror as specified in PDF
  namespace :v1 do
    namespace :ror do
      # Health check
      get 'health', to: 'health#check'

      # Authentication endpoints (handled by Supabase, but we provide API tokens)
      post 'auth/register', to: 'auth#register'
      post 'auth/login', to: 'auth#login'
      get 'auth/me', to: 'auth#me'

      # Listings endpoints
      resources :listings, only: [:index, :show, :create, :update, :destroy] do
        collection do
          get 'new', to: 'listings#new_listings'
          get 'search', to: 'listings#search'
          get 'user/my-listings', to: 'listings#my_listings'
        end
      end

      # Categories endpoints
      resources :categories, only: [:index, :show]
    end
  end

  # Root
  root 'v1/ror/health#check'
end

