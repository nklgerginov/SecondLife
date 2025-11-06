class Listing
  attr_accessor :id, :title, :description, :price, :size, :brand, :condition, :location, :status, :user_id, :category_id, :images

  def initialize(attributes = {})
    @id = attributes[:id]
    @title = attributes[:title]
    @description = attributes[:description]
    @price = attributes[:price]
    @size = attributes[:size]
    @brand = attributes[:brand]
    @condition = attributes[:condition]
    @location = attributes[:location]
    @status = attributes[:status]
    @user_id = attributes[:user_id]
    @category_id = attributes[:category_id]
    @images = attributes[:images] || []
  end
end

