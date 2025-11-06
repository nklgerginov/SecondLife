import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import ListingCard from '../components/ListingCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { mockListings } from '../data/mockData';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  
  // Filter listings based on search
  const searchResults = mockListings.filter(item => {
    const matchesQuery = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !location || 
      item.location.toLowerCase().includes(location.toLowerCase());
    return matchesQuery && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Search Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Search Listings
          </h1>
          <p className="text-muted-foreground text-lg mb-6">Find your perfect pre-loved fashion</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="Search items, brands, descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 sm:h-14 text-base border-2 focus:border-primary"
              />
              <Input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full sm:w-56 h-12 sm:h-14 text-base border-2 focus:border-primary"
              />
            </div>
            <Button size="lg" className="w-full sm:w-auto h-12 sm:h-14 text-base font-semibold shadow-lg">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 sm:h-14 text-base border-2">
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <p className="text-base sm:text-lg text-muted-foreground font-medium">
              Found <span className="text-foreground font-bold">{searchResults.length}</span> {searchResults.length === 1 ? 'result' : 'results'}
            </p>
          </div>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {searchResults.map(item => (
                <ListingCard 
                  key={item.id} 
                  id={item.id}
                  image={item.images[0]}
                  title={item.title}
                  price={item.price.toFixed(2)}
                  size={item.size}
                  brand={item.brand}
                  condition={item.condition}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No results found. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
