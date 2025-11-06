import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Search, Sparkles } from 'lucide-react';
import { categories, mockListings } from '../data/mockData';

const HomePage = () => {
  const navigate = useNavigate();
  const newArrivals = mockListings.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Search Section */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Sustainable Fashion</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              Find Your
              <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent">
                Second Life
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
              Discover unique vintage and pre-loved fashion. Style that's sustainable and affordable.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mt-8 sm:mt-10 max-w-3xl mx-auto">
              <Input 
                type="text" 
                placeholder="Search for items..." 
                className="w-full sm:flex-1 h-12 sm:h-14 bg-background/95 backdrop-blur-sm border-2 focus:border-primary text-base" 
              />
              <Input 
                type="text" 
                placeholder="Location" 
                className="w-full sm:w-48 h-12 sm:h-14 bg-background/95 backdrop-blur-sm border-2 focus:border-primary text-base" 
              />
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-12 sm:h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate('/search')}
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our curated collections
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map(category => (
              <Card 
                key={category.id} 
                className="cursor-pointer group overflow-hidden transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50"
                onClick={() => navigate(`/search?category=${category.slug}`)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors">
                    {category.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 via-muted/50 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              New Arrivals
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fresh listings added this week
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {newArrivals.map(item => (
              <ListingCard 
                key={item.id} 
                id={item.id}
                image={item.images[0]}
                title={item.title}
                price={item.price.toFixed(2)}
                size={item.size}
                brand={item.brand}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
