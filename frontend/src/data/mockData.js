// Data structure matching backend API format
export const mockListings = [
  {
    id: 1,
    title: 'Vintage Denim Jacket',
    description: 'Beautiful vintage denim jacket in excellent condition. Perfect for adding a retro touch to your wardrobe. Classic blue wash with authentic wear patterns.',
    price: 75.00,
    size: 'M',
    brand: 'Levi\'s',
    condition: 'Excellent',
    category: 'Outerwear',
    location: 'New York, NY',
    seller: {
      id: 1,
      username: 'FashionLover123',
      email: 'fashion@example.com'
    },
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ef9?w=800&h=800&fit=crop'
    ],
    created_at: '2025-01-15T10:30:00Z',
    updated_at: '2025-01-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'Floral Maxi Dress',
    description: 'Elegant floral maxi dress perfect for summer occasions. Flowing fabric with beautiful flower patterns. Great condition with no visible wear.',
    price: 50.00,
    size: 'S',
    brand: 'Zara',
    condition: 'Like New',
    category: 'Dresses',
    location: 'Los Angeles, CA',
    seller: {
      id: 2,
      username: 'StyleQueen',
      email: 'style@example.com'
    },
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=800&fit=crop'
    ],
    created_at: '2025-01-14T14:20:00Z',
    updated_at: '2025-01-14T14:20:00Z'
  },
  {
    id: 3,
    title: 'Leather Ankle Boots',
    description: 'Classic Dr. Martens leather ankle boots. Broken in and comfortable. Timeless style that goes with everything. Some scuffing but adds character.',
    price: 120.00,
    size: '8',
    brand: 'Dr. Martens',
    condition: 'Good',
    category: 'Footwear',
    location: 'Chicago, IL',
    seller: {
      id: 3,
      username: 'BootCollector',
      email: 'boots@example.com'
    },
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800&h=800&fit=crop'
    ],
    created_at: '2025-01-13T09:15:00Z',
    updated_at: '2025-01-13T09:15:00Z'
  },
  {
    id: 4,
    title: 'Striped Sweater',
    description: 'Cozy striped sweater perfect for fall and winter. Soft fabric, great condition. Classic nautical style that never goes out of fashion.',
    price: 45.00,
    size: 'L',
    brand: 'H&M',
    condition: 'Excellent',
    category: 'Outerwear',
    location: 'Miami, FL',
    seller: {
      id: 4,
      username: 'CozyWear',
      email: 'cozy@example.com'
    },
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&h=800&fit=crop'
    ],
    created_at: '2025-01-12T16:45:00Z',
    updated_at: '2025-01-12T16:45:00Z'
  },
  {
    id: 5,
    title: 'Vintage Leather Handbag',
    description: 'Authentic vintage leather handbag with gold hardware. Timeless design, excellent craftsmanship. Some patina adds character.',
    price: 95.00,
    size: 'One Size',
    brand: 'Vintage',
    condition: 'Very Good',
    category: 'Accessories',
    location: 'Seattle, WA',
    seller: {
      id: 5,
      username: 'VintageVibes',
      email: 'vintage@example.com'
    },
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop'
    ],
    created_at: '2025-01-11T11:30:00Z',
    updated_at: '2025-01-11T11:30:00Z'
  },
  {
    id: 6,
    title: 'Classic White Sneakers',
    description: 'Clean white sneakers, barely worn. Perfect for everyday style. Comfortable and versatile.',
    price: 60.00,
    size: '9',
    brand: 'Converse',
    condition: 'Like New',
    category: 'Footwear',
    location: 'Portland, OR',
    seller: {
      id: 6,
      username: 'SneakerHead',
      email: 'sneakers@example.com'
    },
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop'
    ],
    created_at: '2025-01-10T13:20:00Z',
    updated_at: '2025-01-10T13:20:00Z'
  },
  {
    id: 7,
    title: 'Silk Scarf Collection',
    description: 'Set of three beautiful silk scarves in various patterns. Perfect for accessorizing any outfit. All in excellent condition.',
    price: 35.00,
    size: 'One Size',
    brand: 'Various',
    condition: 'Excellent',
    category: 'Accessories',
    location: 'Boston, MA',
    seller: {
      id: 7,
      username: 'AccessoryLover',
      email: 'accessories@example.com'
    },
    images: [
      'https://images.unsplash.com/photo-1583292650898-7f22ba55a5d4?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop'
    ],
    created_at: '2025-01-09T08:15:00Z',
    updated_at: '2025-01-09T08:15:00Z'
  },
  {
    id: 8,
    title: 'Denim Jeans - High Waist',
    description: 'Classic high-waist denim jeans. Perfect fit, great condition. Versatile style for any occasion.',
    price: 55.00,
    size: '28',
    brand: 'Levi\'s',
    condition: 'Excellent',
    category: 'Denim',
    location: 'Austin, TX',
    seller: {
      id: 8,
      username: 'DenimDreams',
      email: 'denim@example.com'
    },
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582418702059-97ebafb888b0?w=800&h=800&fit=crop'
    ],
    created_at: '2025-01-08T15:40:00Z',
    updated_at: '2025-01-08T15:40:00Z'
  }
];

export const categories = [
  { id: 1, name: 'Dresses', slug: 'dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop' },
  { id: 2, name: 'Outerwear', slug: 'outerwear', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
  { id: 3, name: 'Footwear', slug: 'footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop' },
  { id: 4, name: 'Denim', slug: 'denim', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop' },
  { id: 5, name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop' },
  { id: 6, name: 'Vintage', slug: 'vintage', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop' }
];

