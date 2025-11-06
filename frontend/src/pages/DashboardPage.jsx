import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import ListingCard from '../components/ListingCard';
import { Plus, Edit, Trash2, Eye, TrendingUp, Eye as EyeIcon, DollarSign, Package } from 'lucide-react';
import { getMyListings, getFavorites } from '../services/apiService';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [myListings, setMyListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (activeTab === 'listings') {
          const listingsData = await getMyListings();
          setMyListings(listingsData.listings);
        } else if (activeTab === 'saved') {
          const favoritesData = await getFavorites();
          setFavorites(favoritesData.favorites);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const stats = {
    activeListings: myListings.filter(l => l.status === 'active').length,
    totalViews: 1245, // Mock data
    totalSales: 12, // Mock data
    earnings: '$850.00', // Mock data
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">Manage your listings and track your activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-base">Active Listings</CardDescription>
                <Package className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-bold mt-2">{stats.activeListings}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-base">Total Views</CardDescription>
                <EyeIcon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-bold mt-2">{stats.totalViews.toLocaleString()}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-base">Total Sales</CardDescription>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-bold mt-2">{stats.totalSales}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-base">Total Earnings</CardDescription>
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-bold mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {stats.earnings}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b-2">
          <Button
            variant={activeTab === 'listings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('listings')}
            className="rounded-b-none h-12 px-6 font-semibold"
          >
            My Listings
          </Button>
          <Button
            variant={activeTab === 'saved' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('saved')}
            className="rounded-b-none h-12 px-6 font-semibold"
          >
            Saved Items
          </Button>
          <Button
            variant={activeTab === 'messages' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('messages')}
            className="rounded-b-none h-12 px-6 font-semibold"
          >
            Messages
          </Button>
        </div>

        {/* Content */}
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            {activeTab === 'listings' && (
              <div>
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold">My Listings</h2>
                  <Button onClick={() => navigate('/post')} size="lg" className="h-12 shadow-lg">
                    <Plus className="mr-2 h-5 w-5" />
                    <span className="hidden sm:inline">New Listing</span>
                    <span className="sm:hidden">New</span>
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                  {myListings.map(listing => (
                    <div key={listing.id} className="relative space-y-3">
                      <div className="absolute top-3 right-3 z-10">
                        <Badge variant={listing.status === 'active' ? 'default' : 'secondary'} className="text-sm px-3 py-1">
                          {listing.status}
                        </Badge>
                      </div>
                      <ListingCard 
                        id={listing.id}
                        image={listing.image}
                        title={listing.title}
                        price={listing.price}
                        size={listing.size}
                        brand={listing.brand}
                        condition={listing.condition}
                      />
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 h-10">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 h-10">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 h-10 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Saved Items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                  {favorites.map(fav => (
                    <ListingCard 
                      key={fav.listing.id} 
                      id={fav.listing.id}
                      image={fav.listing.image}
                      title={fav.listing.title}
                      price={fav.listing.price}
                      size={fav.listing.size}
                      brand={fav.listing.brand}
                      condition={fav.listing.condition}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <Card>
                <CardContent className="p-6 sm:p-12 text-center">
                  <p className="text-muted-foreground">No messages yet</p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
