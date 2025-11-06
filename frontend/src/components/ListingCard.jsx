import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from './ui/card';

const ListingCard = ({ id, image, title, price, size, brand }) => {
  return (
    <Link to={`/listing/${id}`} className="block h-full">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]">
        <div className="relative w-full aspect-square sm:aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105" 
          />
        </div>
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold line-clamp-2 mb-1">{title}</h3>
          <p className="text-sm sm:text-base text-muted-foreground">{brand}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 sm:p-6 pt-0">
          <p className="text-lg sm:text-xl font-bold text-foreground">${price}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Size: {size}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ListingCard;
