
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Button from './Button';
import { Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogin = () => {
    navigate('/dashboard');
  };

  const handleUploadTrades = () => {
    navigate('/dashboard');
  };

  const scrollToTestimonials = () => {
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300',
        scrolled ? 'py-3 bg-black/50 backdrop-blur-lg shadow-sm' : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="font-bold text-2xl text-white">
            Profit<span className="text-purple-500">Pilot</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-purple-400 transition-colors font-roboto font-medium">
            Home
          </Link>
          <a href="#features" className="text-white hover:text-purple-400 transition-colors font-roboto font-medium">
            Features
          </a>
          <a href="#how-it-works" className="text-white hover:text-purple-400 transition-colors font-roboto font-medium">
            How It Works
          </a>
          <a href="#pricing" className="text-white hover:text-purple-400 transition-colors font-roboto font-medium">
            Pricing
          </a>
          <a href="#testimonials" onClick={scrollToTestimonials} className="text-white hover:text-purple-400 transition-colors font-roboto font-medium">
            Testimonials
          </a>
          <a href="#faq" className="text-white hover:text-purple-400 transition-colors font-roboto font-medium">
            FAQ
          </a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleLogin}>
            Log In
          </Button>
          <Button size="sm" glow onClick={handleUploadTrades}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Trades
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-300 hover:text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={cn(
              "block w-6 h-0.5 bg-current transition-all duration-300",
              mobileMenuOpen && "rotate-45 translate-y-2"
            )} />
            <span className={cn(
              "block w-6 h-0.5 bg-current transition-all duration-300",
              mobileMenuOpen && "opacity-0"
            )} />
            <span className={cn(
              "block w-6 h-0.5 bg-current transition-all duration-300",
              mobileMenuOpen && "-rotate-45 -translate-y-2"
            )} />
          </div>
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed top-[70px] right-0 bottom-0 z-40 w-[75%] bg-black/90 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full py-8 px-6">
            <nav className="flex flex-col space-y-6 mb-8">
              <Link to="/" className="text-lg font-medium text-white hover:text-purple-400" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <a href="#features" className="text-lg font-medium text-white hover:text-purple-400" onClick={toggleMobileMenu}>
                Features
              </a>
              <a href="#how-it-works" className="text-lg font-medium text-white hover:text-purple-400" onClick={toggleMobileMenu}>
                How It Works
              </a>
              <a href="#pricing" className="text-lg font-medium text-white hover:text-purple-400" onClick={toggleMobileMenu}>
                Pricing
              </a>
              <a href="#testimonials" onClick={scrollToTestimonials} className="text-lg font-medium text-white hover:text-purple-400">
                Testimonials
              </a>
              <a href="#faq" className="text-lg font-medium text-white hover:text-purple-400" onClick={toggleMobileMenu}>
                FAQ
              </a>
            </nav>
            <div className="mt-auto flex flex-col space-y-4">
              <Button variant="outline" fullWidth onClick={handleLogin}>
                Log In
              </Button>
              <Button glow fullWidth onClick={handleUploadTrades}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Trades
              </Button>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-30"
            onClick={toggleMobileMenu}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
