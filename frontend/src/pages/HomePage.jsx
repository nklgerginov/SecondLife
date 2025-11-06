import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Search } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const categories = ["Dresses", "Outerwear", "Footwear", "Denim", "Accessories", "Vintage"];
  const newArrivals = [
    { id: 1, image: 'https://via.placeholder.com/300', title: 'Vintage Denim Jacket', price: '75.00', size: 'M', brand: 'Levi\'s' },
    { id: 2, image: 'https://via.placeholder.com/300', title: 'Floral Maxi Dress', price: '50.00', size: 'S', brand: 'Zara' },
    { id: 3, image: 'https://via.placeholder.com/300', title: 'Leather Ankle Boots', price: '120.00', size: '8', brand: 'Dr. Martens' },
    { id: 4, image: 'https://via.placeholder.com/300', title: 'Striped Sweater', price: '45.00', size: 'L', brand: 'H&M' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Search Section */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center"
        style={{ backgroundImage: "url('https://via.placeholder.com/1200x400')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Find Your Second Life
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              The best marketplace for vintage and used fashion.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-stretch sm:items-center mt-6 sm:mt-8">
              <Input 
                type="text" 
                placeholder="e.g. Vintage Jacket" 
                className="w-full sm:w-64 md:w-96 h-11 sm:h-12 bg-background/95" 
              />
              <Input 
                type="text" 
                placeholder="Location" 
                className="w-full sm:w-48 md:w-64 h-11 sm:h-12 bg-background/95" 
              />
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-11 sm:h-12"
                onClick={() => navigate('/search')}
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
            {categories.map(category => (
              <Card 
                key={category} 
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                onClick={() => navigate(`/search?category=${category}`)}
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <p className="font-semibold text-sm sm:text-base">{category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-12">
            New Arrivals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {newArrivals.map(item => (
              <ListingCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
