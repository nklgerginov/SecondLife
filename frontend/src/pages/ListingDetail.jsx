import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Heart, Share2, MessageCircle, MapPin, User } from 'lucide-react';
import { getListing } from '../services/apiService';

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const data = await getListing(id);
        setListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 sm:mb-8 hover:bg-accent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square overflow-hidden rounded-xl border-2 shadow-lg">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                  {listing.condition}
                </Badge>
              </div>
            </div>
            {listing.images && listing.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {listing.images.slice(1, 5).map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden border-2 cursor-pointer hover:border-primary transition-colors">
                    <img src={img} alt={`${listing.title} ${idx + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-3">
              <Button 
                variant={saved ? "default" : "outline"} 
                className="flex-1 h-12"
                onClick={() => setSaved(!saved)}
              >
                <Heart className={`mr-2 h-4 w-4 ${saved ? 'fill-current' : ''}`} />
                {saved ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" className="flex-1 h-12">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" className="flex-1 h-12">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message
              </Button>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {listing.title}
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-4 font-medium">
                {listing.brand}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="text-sm px-3 py-1">Size: {listing.size}</Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">Condition: {listing.condition}</Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  <MapPin className="mr-1 h-3 w-3" />
                  {listing.location}
                </Badge>
              </div>
            </div>

            <Card className="border-2 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  ${listing.price}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Seller
                  </h3>
                  <p className="text-muted-foreground font-medium">{listing.seller_name}</p>
                </div>
                <Button size="lg" className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl">
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
