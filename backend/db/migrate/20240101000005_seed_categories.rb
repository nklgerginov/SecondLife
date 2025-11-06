class SeedCategories < ActiveRecord::Migration[7.0]
  def up
    Category::DEFAULT_CATEGORIES.each do |cat|
      Category.find_or_create_by(slug: cat[:slug]) do |category|
        category.name = cat[:name]
      end
    end
  end

  def down
    Category.where(slug: Category::DEFAULT_CATEGORIES.map { |c| c[:slug] }).destroy_all
  end
end

