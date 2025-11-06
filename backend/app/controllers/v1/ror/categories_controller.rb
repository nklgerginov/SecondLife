module V1
  module Ror
    class CategoriesController < ApplicationController
      before_action :authenticate_user!, only: [:create, :update, :destroy]

      def index
        response = SUPABASE_CLIENT.from('categories').select('*').execute
        if response.data
          render json: { categories: response.data.map { |c| category_serializer(c) } }
        else
          render json: { error: 'Could not fetch categories' }, status: :internal_server_error
        end
      end

      def show
        response = SUPABASE_CLIENT.from('categories').select('*').eq('id', params[:id]).execute
        if response.data && response.data.any?
          render json: { category: category_serializer(response.data.first) }
        else
          render json: { error: 'Category not found' }, status: :not_found
        end
      end

      def create
        response = SUPABASE_CLIENT.from('categories').insert([category_params]).execute
        if response.data && response.data.any?
          render json: { category: category_serializer(response.data.first) }, status: :created
        else
          render json: { error: 'Could not create category' }, status: :unprocessable_entity
        end
      end

      def update
        response = SUPABASE_CLIENT.from('categories').update(category_params).eq('id', params[:id]).execute
        if response.data && response.data.any?
          render json: { category: category_serializer(response.data.first) }
        else
          render json: { error: 'Could not update category' }, status: :unprocessable_entity
        end
      end

      def destroy
        response = SUPABASE_CLIENT.from('categories').delete.eq('id', params[:id]).execute
        if response.data && response.data.any?
          render json: { message: 'Category deleted successfully' }
        else
          render json: { error: 'Could not delete category' }, status: :unprocessable_entity
        end
      end

      private

      def category_params
        params.require(:category).permit(:name, :slug)
      end

      def category_serializer(category)
        {
          id: category['id'],
          name: category['name'],
          slug: category['slug'],
          created_at: category['created_at']
        }
      end
    end
  end
end

