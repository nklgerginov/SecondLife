import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Sheet, SheetContent } from './ui/sheet';
import { ThemeToggle } from './ui/theme-toggle';
import { Menu } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Search' },
    { to: '/post', label: 'Post Ad' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/auth', label: 'Login/Register' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hover:from-primary/80 hover:to-primary/40 transition-all">
            SecondLife
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map((link) => (
              <Button
                key={link.to}
                asChild
                variant="ghost"
                className="text-sm sm:text-base hover:bg-accent"
              >
                <Link to={link.to}>{link.label}</Link>
              </Button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent onOpenChange={setMobileMenuOpen} className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-2 mt-8">
            {navLinks.map((link) => (
              <Button
                key={link.to}
                asChild
                variant="ghost"
                className="justify-start text-lg h-12 hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to={link.to}>{link.label}</Link>
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
