# Seed default categories
Category::DEFAULT_CATEGORIES.each do |cat|
  Category.find_or_create_by(slug: cat[:slug]) do |category|
    category.name = cat[:name]
  end
end

puts "Seeded #{Category.count} categories"

