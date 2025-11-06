class Favorite
  attr_accessor :id, :user_id, :listing_id

  def initialize(attributes = {})
    @id = attributes[:id]
    @user_id = attributes[:user_id]
    @listing_id = attributes[:listing_id]
  end
end

