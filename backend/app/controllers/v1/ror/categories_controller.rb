module V1
  module Ror
    class CategoriesController < ApplicationController
      # GET /v1/ror/categories
      def index
        categories = Category.order(:name)
        render json: { categories: categories.map { |c| category_serializer(c) } }
      end

      # GET /v1/ror/categories/:id
      def show
        category = Category.find(params[:id])
        render json: { category: category_serializer(category) }
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Category not found' }, status: :not_found
      end

      private

      def category_serializer(category)
        {
          id: category.id,
          name: category.name,
          slug: category.slug,
          created_at: category.created_at
        }
      end
    end
  end
end

