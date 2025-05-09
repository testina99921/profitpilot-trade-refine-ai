
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={cn(
        "lunexa-nav transition-all duration-300",
        isScrolled && "shadow-lg shadow-black/10"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl text-white">
          LUNEXA
        </Link>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/" className="lunexa-nav-link active">
            Home
          </Link>
          <Link to="/features" className="lunexa-nav-link">
            Features
          </Link>
          <Link to="/blog" className="lunexa-nav-link">
            How It Works
          </Link>
          <Link to="/pricing" className="lunexa-nav-link">
            Pricing
          </Link>
          <Link to="/testimonials" className="lunexa-nav-link">
            Testimonials
          </Link>
          <Link to="/faq" className="lunexa-nav-link">
            FAQ
          </Link>
        </div>
        
        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="lunexa-btn text-sm font-medium text-white/80 hover:text-white">
            Login
          </Link>
          <Link to="/dashboard" className="lunexa-btn lunexa-btn-primary">
            Get Started
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-white/5 shadow-xl">
          <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
            <Link to="/" className="lunexa-nav-link active">
              Home
            </Link>
            <Link to="/features" className="lunexa-nav-link">
              Features
            </Link>
            <Link to="/blog" className="lunexa-nav-link">
              How It Works
            </Link>
            <Link to="/pricing" className="lunexa-nav-link">
              Pricing
            </Link>
            <Link to="/testimonials" className="lunexa-nav-link">
              Testimonials
            </Link>
            <Link to="/faq" className="lunexa-nav-link">
              FAQ
            </Link>
            
            <div className="pt-3 flex flex-col space-y-3 border-t border-white/5">
              <Link to="/login" className="lunexa-btn lunexa-btn-outline">
                Login
              </Link>
              <Link to="/dashboard" className="lunexa-btn lunexa-btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
