module V1
  module Ror
    class FavoritesController < ApplicationController
      before_action :authenticate_user!

      def index
        response = SUPABASE_CLIENT.from('favorites').select('*, listing:listings(*, category:categories(*), user:users(*))').eq('user_id', current_user.id).execute
        if response.data
          render json: { favorites: response.data.map { |f| favorite_serializer(f) } }
        else
          render json: { error: 'Could not fetch favorites' }, status: :internal_server_error
        end
      end

      def create
        favorite_data = { user_id: current_user.id, listing_id: params[:listing_id] }
        response = SUPABASE_CLIENT.from('favorites').insert([favorite_data]).execute
        if response.data && response.data.any?
          render json: { favorite: response.data.first }, status: :created
        else
          render json: { error: 'Could not add favorite' }, status: :unprocessable_entity
        end
      end

      def destroy
        response = SUPABASE_CLIENT.from('favorites').delete.eq('user_id', current_user.id).eq('listing_id', params[:listing_id]).execute
        if response.data && response.data.any?
          render json: { message: 'Favorite removed successfully' }
        else
          render json: { error: 'Could not remove favorite' }, status: :unprocessable_entity
        end
      end

      private

      def favorite_serializer(favorite)
        {
          id: favorite['id'],
          listing: listing_serializer(favorite['listing'])
        }
      end

      def listing_serializer(listing)
        {
          id: listing['id'],
          title: listing['title'],
          price: listing['price'].to_s,
          image: (listing['images'] || []).first
        }
      end
    end
  end
end
