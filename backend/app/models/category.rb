class Category < ApplicationRecord
  has_many :listings, dependent: :nullify

  validates :name, presence: true, uniqueness: true
  validates :slug, presence: true, uniqueness: true

  # Default categories from PDF
  DEFAULT_CATEGORIES = [
    { name: 'Dresses', slug: 'dresses' },
    { name: 'Outerwear', slug: 'outerwear' },
    { name: 'Footwear', slug: 'footwear' },
    { name: 'Denim', slug: 'denim' },
    { name: 'Accessories', slug: 'accessories' },
    { name: 'Vintage', slug: 'vintage' }
  ].freeze
end

