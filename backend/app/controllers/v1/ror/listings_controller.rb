module V1
  module Ror
    class ListingsController < ApplicationController
      before_action :authenticate_user!, except: [:index, :show, :new_listings, :search]
      before_action :set_listing, only: [:show, :update, :destroy]
      before_action :authorize_owner, only: [:update, :destroy]

      def index
        query = SUPABASE_CLIENT.from('listings').select('*, category:categories(*), user:users(*)').eq('status', 'active').order('created_at', 'desc')

        query = query.eq('category_id', params[:category]) if params[:category].present?
        query = query.gte('price', params[:minPrice]) if params[:minPrice].present?
        query = query.lte('price', params[:maxPrice]) if params[:maxPrice].present?
        query = query.text_search('fts', params[:search]) if params[:search].present?

        page = params[:page] || 1
        limit = params[:limit] || 20
        offset = (page.to_i - 1) * limit.to_i

        response = query.range(offset, offset + limit.to_i - 1).execute

        if response.data
          render json: {
            listings: response.data.map { |l| listing_serializer(l) },
            pagination: {
              page: page.to_i,
              limit: limit.to_i,
              # Total count would require another query, which can be expensive.
              # For now, we can return the count of the current page.
              total: response.data.length
            }
          }
        else
          render json: { error: 'Could not fetch listings' }, status: :internal_server_error
        end
      end

      def new_listings
        response = SUPABASE_CLIENT.from('listings').select('*, category:categories(*), user:users(*)').eq('status', 'active').order('created_at', 'desc').limit(params[:limit] || 10).execute
        if response.data
          render json: { listings: response.data.map { |l| listing_serializer(l) } }
        else
          render json: { error: 'Could not fetch new listings' }, status: :internal_server_error
        end
      end

      def search
        query = params[:q]
        return render json: { error: 'Search query required' }, status: :bad_request unless query

        response = SUPABASE_CLIENT.from('listings').select('*, category:categories(*), user:users(*)').eq('status', 'active').text_search('fts', query).order('created_at', 'desc').execute

        if response.data
          render json: { listings: response.data.map { |l| listing_serializer(l) } }
        else
          render json: { error: 'Could not perform search' }, status: :internal_server_error
        end
      end

      def show
        response = SUPABASE_CLIENT.from('listings').select('*, category:categories(*), user:users(*)').eq('id', params[:id]).execute
        if response.data && response.data.any?
          render json: listing_detail_serializer(response.data.first)
        else
          render json: { error: 'Listing not found' }, status: :not_found
        end
      end

      def create
        # Upload images to Supabase Storage
        image_urls = []
        if params[:images].present?
          Array(params[:images]).each do |image|
            response = SUPABASE_CLIENT.storage.from('listings').upload(image.original_filename, image.tempfile)
            if response.success?
              image_urls << response.data['url']
            else
              # Handle upload error
            end
          end
        end

        # Create listing in Supabase
        listing_data = listing_params.merge(user_id: current_user.id, images: image_urls)
        response = SUPABASE_CLIENT.from('listings').insert([listing_data]).execute

        if response.data && response.data.any?
          render json: {
            message: 'Listing created successfully',
            listing: listing_serializer(response.data.first)
          }, status: :created
        else
          render json: { error: 'Could not create listing' }, status: :unprocessable_entity
        end
      end

      def update
        # For simplicity, we are not handling image updates in this refactoring
        response = SUPABASE_CLIENT.from('listings').update(listing_params).eq('id', params[:id]).execute
        if response.data && response.data.any?
          render json: {
            message: 'Listing updated successfully',
            listing: listing_serializer(response.data.first)
          }
        else
          render json: { error: 'Could not update listing' }, status: :unprocessable_entity
        end
      end

      def destroy
        response = SUPABASE_CLIENT.from('listings').delete.eq('id', params[:id]).execute
        if response.data && response.data.any?
          render json: { message: 'Listing deleted successfully' }
        else
          render json: { error: 'Could not delete listing' }, status: :unprocessable_entity
        end
      end

      def my_listings
        response = SUPABASE_CLIENT.from('listings').select('*, category:categories(*)').eq('user_id', current_user.id).order('created_at', 'desc').execute
        if response.data
          render json: { listings: response.data.map { |l| listing_serializer(l) } }
        else
          render json: { error: 'Could not fetch user listings' }, status: :internal_server_error
        end
      end

      private

      def set_listing
        # This method is no longer needed as we fetch the listing directly in each action
      end

      def authorize_owner
        response = SUPABASE_CLIENT.from('listings').select('user_id').eq('id', params[:id]).execute
        if response.data && response.data.any?
          unless response.data.first['user_id'] == current_user.id
            render json: { error: 'Not authorized' }, status: :forbidden
          end
        else
          render json: { error: 'Listing not found' }, status: :not_found
        end
      end

      def listing_params
        params.require(:listing).permit(:title, :description, :price, :size, :brand, 
                                        :category_id, :condition, :location, :status)
      end

      def attach_images(listing)
        Array(params[:images]).each do |image|
          listing.images.attach(image)
        end
      end

      def listing_serializer(listing)
        {
          id: listing['id'],
          title: listing['title'],
          description: listing['description'],
          price: listing['price'].to_s,
          size: listing['size'],
          brand: listing['brand'],
          images: listing['images'] || [],
          image: (listing['images'] || []).first,
          location: listing['location'],
          status: listing['status'],
          created_at: listing['created_at'],
          category_name: listing['category'] ? listing['category']['name'] : nil,
          category_slug: listing['category'] ? listing['category']['slug'] : nil,
          seller_name: listing['user'] ? "#{listing['user']['first_name']} #{listing['user']['last_name']}".strip : nil
        }
      end

      def listing_detail_serializer(listing)
        listing_serializer(listing).merge(
          seller_id: listing['user_id'],
          seller_email: listing['user'] ? listing['user']['email'] : nil,
          condition: listing['condition']
        )
      end
    end
  end
end

