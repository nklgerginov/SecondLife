class Listing < ApplicationRecord
  belongs_to :user
  belongs_to :category, optional: true
  has_many :favorites, dependent: :destroy

  validates :title, presence: true, length: { minimum: 3, maximum: 255 }
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :status, inclusion: { in: %w[active sold deleted] }

  scope :active, -> { where(status: 'active') }
  scope :newest, -> { order(created_at: :desc) }
  scope :search, ->(query) {
    where("title ILIKE ? OR description ILIKE ? OR brand ILIKE ?", 
          "%#{query}%", "%#{query}%", "%#{query}%") if query.present?
  }

  # Image attachments (using Active Storage)
  has_many_attached :images

  def image_urls
    return [] unless images.attached?
    images.map do |img|
      Rails.application.routes.url_helpers.rails_blob_url(img, host: ENV['API_HOST'] || 'http://localhost:3000')
    end
  end

  def primary_image
    images.attached? ? images.first : nil
  end
end

