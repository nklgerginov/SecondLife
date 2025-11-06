module V1
  module Ror
    class AuthController < ApplicationController
      skip_before_action :authenticate_user!, only: [:register, :login]

      # Register - Supabase handles actual registration, we just store user data
      def register
        # In production, this would verify the Supabase user first
        user = User.new(user_params)
        user.supabase_id = params[:supabase_id] || SecureRandom.uuid # Placeholder

        if user.save
          render json: {
            message: 'User registered successfully',
            user: user_serializer(user),
            token: generate_token(user)
          }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # Login - Supabase handles authentication, we return API token
      def login
        user = User.find_by(email: params[:email])
        
        if user
          # In production, verify Supabase session here
          render json: {
            message: 'Login successful',
            user: user_serializer(user),
            token: generate_token(user)
          }
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      # Get current user
      def me
        render json: { user: user_serializer(current_user) }
      end

      private

      def user_params
        params.require(:user).permit(:email, :first_name, :last_name, :phone)
      end

      def user_serializer(user)
        {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name
        }
      end

      def generate_token(user)
        payload = {
          user_id: user.id,
          email: user.email,
          exp: 7.days.from_now.to_i
        }
        secret = Rails.application.credentials.secret_key_base || ENV['SECRET_KEY_BASE'] || 'development_secret'
        JWT.encode(payload, secret, 'HS256')
      end
    end
  end
end

