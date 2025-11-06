import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Heart, Share2, MessageCircle } from 'lucide-react';

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock listing data
  const listing = {
    id: id,
    image: 'https://via.placeholder.com/800',
    title: 'Vintage Denim Jacket',
    price: '75.00',
    size: 'M',
    brand: 'Levi\'s',
    description: 'Beautiful vintage denim jacket in excellent condition. Perfect for adding a retro touch to your wardrobe.',
    condition: 'Excellent',
    location: 'New York, NY',
    seller: 'FashionLover123',
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square overflow-hidden rounded-lg border">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 sm:gap-4">
              <Button variant="outline" className="flex-1">
                <Heart className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message
              </Button>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                {listing.title}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-4">
                {listing.brand}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">Size: {listing.size}</Badge>
                <Badge variant="secondary">Condition: {listing.condition}</Badge>
                <Badge variant="outline">{listing.location}</Badge>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-3xl sm:text-4xl">
                  ${listing.price}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{listing.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Seller</h3>
                  <p className="text-muted-foreground">{listing.seller}</p>
                </div>
                <Button size="lg" className="w-full h-12">
                  Contact Seller
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
