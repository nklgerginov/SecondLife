class User < ApplicationRecord
  # Supabase handles authentication, but we store user data
  has_many :listings, dependent: :destroy
  has_many :favorites, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :supabase_id, presence: true, uniqueness: true
end

