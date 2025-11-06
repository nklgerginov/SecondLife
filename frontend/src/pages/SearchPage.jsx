import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import ListingCard from '../components/ListingCard';
import { Search, Filter } from 'lucide-react';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  
  // Mock search results
  const searchResults = [
    { id: 1, image: 'https://via.placeholder.com/300', title: 'Vintage Denim Jacket', price: '75.00', size: 'M', brand: 'Levi\'s' },
    { id: 2, image: 'https://via.placeholder.com/300', title: 'Floral Maxi Dress', price: '50.00', size: 'S', brand: 'Zara' },
    { id: 3, image: 'https://via.placeholder.com/300', title: 'Leather Ankle Boots', price: '120.00', size: '8', brand: 'Dr. Martens' },
    { id: 4, image: 'https://via.placeholder.com/300', title: 'Striped Sweater', price: '45.00', size: 'L', brand: 'H&M' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Search Header */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Search Listings
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 sm:h-12"
              />
              <Input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full sm:w-48 h-11 sm:h-12"
              />
            </div>
            <Button size="lg" className="w-full sm:w-auto h-11 sm:h-12">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-11 sm:h-12">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
            Found {searchResults.length} results
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {searchResults.map(item => (
              <ListingCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
