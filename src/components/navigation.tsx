import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    // Reset scroll position when navigating to ensure navbar visibility
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Packages', href: '/packages' },
    { name: 'Cabs', href: '/cabs' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div>
            <h1 className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-neutral-900' : 'text-white'
            }`}>
              Ziyara Travels
            </h1>
            <p className={`text-sm transition-colors ${
              isScrolled ? 'text-muted-foreground' : 'text-neutral-200'
            }`}>
              Transport Services
            </p>
          </div>
        </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors hover:text-gold ${
                  location.pathname === item.href ? 'text-gold' : 
                  isScrolled ? 'text-neutral-900' : 'text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/booking">
              <Button 
                variant="default"
                className="bg-gold hover:bg-gold-dark text-white shadow-elegant"
              >
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`md:hidden ${isScrolled ? 'text-neutral-900' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-border animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block w-full text-left font-medium transition-colors py-2 ${
                    location.pathname === item.href ? 'text-gold' : 'text-neutral-900 hover:text-gold'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/booking" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gold hover:bg-gold-dark text-white mt-4">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;