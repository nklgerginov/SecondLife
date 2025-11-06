module V1
  module Ror
    class AuthController < ApplicationController
      skip_before_action :authenticate_user!, only: [:register, :login]

      def register
        begin
          response = SUPABASE_CLIENT.auth.sign_up(email: params[:email], password: params[:password])
          if response.user
            user = User.new(user_params.merge(supabase_id: response.user.id))
            if user.save
              render json: {
                message: 'User registered successfully',
                user: user_serializer(user),
                access_token: response.access_token,
                refresh_token: response.refresh_token
              }, status: :created
            else
              # If local user creation fails, consider deleting the Supabase user
              render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
            end
          else
            render json: { error: response.error.message }, status: :unprocessable_entity
          end
        rescue Supabase::Gotrue::APIError => e
          render json: { error: e.message }, status: :unprocessable_entity
        end
      end

      def login
        begin
          response = SUPABASE_CLIENT.auth.sign_in_with_password(email: params[:email], password: params[:password])
          if response.user
            user = User.find_by(supabase_id: response.user.id)
            if user
              render json: {
                message: 'Login successful',
                user: user_serializer(user),
                access_token: response.access_token,
                refresh_token: response.refresh_token
              }
            else
              render json: { error: 'User not found in local database' }, status: :unauthorized
            end
          else
            render json: { error: response.error.message }, status: :unauthorized
          end
        rescue Supabase::Gotrue::APIError => e
          render json: { error: e.message }, status: :unauthorized
        end
      end

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
    end
  end
end

