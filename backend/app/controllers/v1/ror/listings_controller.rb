module V1
  module Ror
    class ListingsController < ApplicationController
      before_action :authenticate_user!, except: [:index, :show, :new_listings, :search]
      before_action :set_listing, only: [:show, :update, :destroy]
      before_action :authorize_owner, only: [:update, :destroy]

      # GET /v1/ror/listings
      def index
        listings = Listing.active
                        .includes(:user, :category)
                        .order(created_at: :desc)

        listings = listings.where(category_id: params[:category]) if params[:category].present?
        listings = listings.where('price >= ?', params[:minPrice]) if params[:minPrice].present?
        listings = listings.where('price <= ?', params[:maxPrice]) if params[:maxPrice].present?
        listings = listings.search(params[:search]) if params[:search].present?

        page = params[:page] || 1
        limit = params[:limit] || 20
        total = listings.count
        listings = listings.limit(limit).offset((page.to_i - 1) * limit.to_i)

        render json: {
          listings: listings.map { |l| listing_serializer(l) },
          pagination: {
            page: page.to_i,
            limit: limit.to_i,
            total: total,
            totalPages: (total.to_f / limit.to_i).ceil
          }
        }
      end

      # GET /v1/ror/listings/new
      def new_listings
        listings = Listing.active
                        .includes(:category)
                        .newest
                        .limit(params[:limit] || 10)

        render json: { listings: listings.map { |l| listing_serializer(l) } }
      end

      # GET /v1/ror/listings/search
      def search
        query = params[:q]
        return render json: { error: 'Search query required' }, status: :bad_request unless query

        listings = Listing.active
                        .includes(:category)
                        .search(query)
                        .order(created_at: :desc)

        page = params[:page] || 1
        limit = params[:limit] || 20
        total = listings.count
        listings = listings.limit(limit).offset((page.to_i - 1) * limit.to_i)

        render json: {
          listings: listings.map { |l| listing_serializer(l) },
          pagination: {
            page: page.to_i,
            limit: limit.to_i,
            total: total,
            totalPages: (total.to_f / limit.to_i).ceil
          }
        }
      end

      # GET /v1/ror/listings/:id
      def show
        render json: listing_detail_serializer(@listing)
      end

      # POST /v1/ror/listings
      def create
        listing = current_user.listings.build(listing_params)

        if listing.save
          # Handle image uploads
          attach_images(listing) if params[:images].present?

          render json: {
            message: 'Listing created successfully',
            listing: listing_serializer(listing.reload)
          }, status: :created
        else
          render json: { errors: listing.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PUT /v1/ror/listings/:id
      def update
        if @listing.update(listing_params)
          attach_images(@listing) if params[:images].present?

          render json: {
            message: 'Listing updated successfully',
            listing: listing_serializer(@listing.reload)
          }
        else
          render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /v1/ror/listings/:id
      def destroy
        @listing.update(status: 'deleted')
        render json: { message: 'Listing deleted successfully' }
      end

      # GET /v1/ror/listings/user/my-listings
      def my_listings
        listings = current_user.listings
                              .includes(:category)
                              .order(created_at: :desc)

        render json: { listings: listings.map { |l| listing_serializer(l) } }
      end

      private

      def set_listing
        @listing = Listing.find(params[:id])
      end

      def authorize_owner
        unless @listing.user_id == current_user.id
          render json: { error: 'Not authorized' }, status: :forbidden
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
          id: listing.id,
          title: listing.title,
          description: listing.description,
          price: listing.price.to_s,
          size: listing.size,
          brand: listing.brand,
          images: listing.image_urls,
          image: listing.primary_image ? listing.image_urls.first : nil,
          location: listing.location,
          status: listing.status,
          created_at: listing.created_at,
          category_name: listing.category&.name,
          category_slug: listing.category&.slug,
          seller_name: listing.user ? "#{listing.user.first_name} #{listing.user.last_name}".strip : nil
        }
      end

      def listing_detail_serializer(listing)
        listing_serializer(listing).merge(
          seller_id: listing.user_id,
          seller_email: listing.user&.email,
          condition: listing.condition
        )
      end
    end
  end
end

