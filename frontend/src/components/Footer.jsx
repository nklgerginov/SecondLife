import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              SecondLife
            </h3>
            <p className="text-sm text-muted-foreground">
              Your sustainable fashion marketplace. Find unique pre-loved items and give them a second life.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/search" className="hover:text-primary transition-colors">Browse All</Link></li>
              <li><Link to="/search?category=dresses" className="hover:text-primary transition-colors">Dresses</Link></li>
              <li><Link to="/search?category=outerwear" className="hover:text-primary transition-colors">Outerwear</Link></li>
              <li><Link to="/search?category=footwear" className="hover:text-primary transition-colors">Footwear</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Sell</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/post" className="hover:text-primary transition-colors">Post a Listing</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">My Dashboard</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Seller Guide</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" /> for sustainable fashion
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            &copy; 2025 SecondLife. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
