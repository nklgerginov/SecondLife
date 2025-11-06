class Category
  attr_accessor :id, :name, :slug

  def initialize(attributes = {})
    @id = attributes[:id]
    @name = attributes[:name]
    @slug = attributes[:slug]
  end
end

