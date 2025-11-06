import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';

const ListingCard = ({ id, image, title, price, size, brand, condition }) => {
  return (
    <Link to={`/listing/${id}`} className="block h-full group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-2 hover:border-primary/30 bg-card">
        <div className="relative w-full aspect-square sm:aspect-[4/3] overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {condition && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                {condition}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4 sm:p-6 space-y-2">
          <h3 className="text-base sm:text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">{brand}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 sm:p-6 pt-0 border-t">
          <p className="text-xl sm:text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            ${price}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">Size: {size}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ListingCard;
