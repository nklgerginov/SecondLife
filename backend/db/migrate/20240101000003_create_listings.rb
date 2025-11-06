class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.text :description
      t.decimal :price, precision: 10, scale: 2, null: false
      t.string :size
      t.string :brand
      t.references :category, null: true, foreign_key: true
      t.string :condition
      t.string :location
      t.string :status, default: 'active', null: false
      t.timestamps
    end

    add_index :listings, :status
    add_index :listings, :category_id
    add_index :listings, :user_id
    add_index :listings, :price
    add_index :listings, :created_at
    # Full-text search indexes
    add_index :listings, :title
    add_index :listings, :brand
  end
end

