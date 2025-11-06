import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import ListingCard from '../components/ListingCard';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');

  // Mock data
  const myListings = [
    { id: 1, image: 'https://via.placeholder.com/300', title: 'Vintage Denim Jacket', price: '75.00', size: 'M', brand: 'Levi\'s', status: 'active' },
    { id: 2, image: 'https://via.placeholder.com/300', title: 'Floral Maxi Dress', price: '50.00', size: 'S', brand: 'Zara', status: 'sold' },
  ];

  const stats = {
    activeListings: 1,
    totalViews: 245,
    totalSales: 12,
    earnings: '$850.00',
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your listings and track your activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Listings</CardDescription>
              <CardTitle className="text-2xl sm:text-3xl">{stats.activeListings}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Views</CardDescription>
              <CardTitle className="text-2xl sm:text-3xl">{stats.totalViews}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Sales</CardDescription>
              <CardTitle className="text-2xl sm:text-3xl">{stats.totalSales}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Earnings</CardDescription>
              <CardTitle className="text-2xl sm:text-3xl">{stats.earnings}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 border-b">
          <Button
            variant={activeTab === 'listings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('listings')}
            className="rounded-b-none"
          >
            My Listings
          </Button>
          <Button
            variant={activeTab === 'saved' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('saved')}
            className="rounded-b-none"
          >
            Saved Items
          </Button>
          <Button
            variant={activeTab === 'messages' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('messages')}
            className="rounded-b-none"
          >
            Messages
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold">My Listings</h2>
              <Button onClick={() => navigate('/post')} size="lg" className="h-11">
                <Plus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">New Listing</span>
                <span className="sm:hidden">New</span>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {myListings.map(listing => (
                <div key={listing.id} className="relative space-y-2">
                  <div className="absolute top-2 right-2 z-10">
                    <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                      {listing.status}
                    </Badge>
                  </div>
                  <ListingCard {...listing} />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <Card>
            <CardContent className="p-6 sm:p-12 text-center">
              <p className="text-muted-foreground">No saved items yet</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'messages' && (
          <Card>
            <CardContent className="p-6 sm:p-12 text-center">
              <p className="text-muted-foreground">No messages yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
