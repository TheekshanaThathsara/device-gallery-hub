import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Set to true immediately - we want the navbar to always have the "scrolled" appearance
    setIsScrolled(true);
    
    // Keep the scroll listener for potential future use
    const handleScroll = () => {
      // Always true regardless of scroll position
      setIsScrolled(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-gradient-to-r from-blue-700 to-blue-600 shadow-md py-3`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/20 backdrop-blur-sm">
              <svg 
                className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Device Gallery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search */}
            <div className="relative transition-all duration-300 w-64">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 pl-10 pr-4 rounded-full text-sm focus:outline-none focus:ring-2 transition-all duration-200 bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:ring-white/50 focus:bg-white/20"
              />
              <div className="absolute left-3 top-2.5">
                <svg 
                  className="h-4 w-4 text-white/70" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Nav Links */}
            <div className="flex items-center space-x-6">
              <Link 
                to="/shop" 
                className={`text-sm font-medium transition-all duration-200 text-white hover:text-yellow-400 hover:scale-105 relative px-1 py-1 group ${
                  location.pathname === '/shop' ? 'text-yellow-400' : ''
                }`}
              >
                Shop
                <span className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-200 ${
                  location.pathname === '/shop' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              <Link 
                to="/new-arrivals" 
                className={`text-sm font-medium transition-all duration-200 text-white hover:text-yellow-400 hover:scale-105 relative px-1 py-1 group ${
                  location.pathname === '/new-arrivals' ? 'text-yellow-400' : ''
                }`}
              >
                New Arrivals
                <span className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-200 ${
                  location.pathname === '/new-arrivals' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              <Link 
                to="/deals" 
                className={`text-sm font-medium transition-all duration-200 text-white hover:text-yellow-400 hover:scale-105 relative px-1 py-1 group ${
                  location.pathname === '/deals' ? 'text-yellow-400' : ''
                }`}
              >
                Deals
                <span className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-200 ${
                  location.pathname === '/deals' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              <Link 
                to="/support" 
                className={`text-sm font-medium transition-all duration-200 text-white hover:text-yellow-400 hover:scale-105 relative px-1 py-1 group ${
                  location.pathname === '/support' ? 'text-yellow-400' : ''
                }`}
              >
                Support
                <span className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-200 ${
                  location.pathname === '/support' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            </div>

            {/* Cart & Account */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-full transition-colors duration-200 hover:bg-white/10">
                <svg 
                  className="h-5 w-5 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs text-blue-800 font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <button className="relative p-2 rounded-full transition-colors duration-200 hover:bg-white/10">
                <svg 
                  className="h-5 w-5 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 rounded-md text-white hover:bg-white/10"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700 backdrop-blur-sm">
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 pl-10 pr-4 rounded-lg text-sm focus:outline-none focus:ring-2 bg-white/10 text-white placeholder-white/70 focus:ring-white/50"
            />
            <div className="absolute left-7 top-16">
              <svg 
                className="h-4 w-4 text-white/70" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <Link 
            to="/shop" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/shop' 
                ? 'text-yellow-400 bg-blue-800/50' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            Shop
          </Link>
          <Link 
            to="/new-arrivals" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/new-arrivals' 
                ? 'text-yellow-400 bg-blue-800/50' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            New Arrivals
          </Link>
          <Link 
            to="/deals" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/deals' 
                ? 'text-yellow-400 bg-blue-800/50' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            Deals
          </Link>
          <Link 
            to="/support" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/support' 
                ? 'text-yellow-400 bg-blue-800/50' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            Support
          </Link>
          <div className="flex items-center justify-between px-3 py-2 border-t border-white/10 mt-2">
            <button className="flex items-center space-x-2">
              <svg 
                className="h-5 w-5 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-white">Cart (3)</span>
            </button>
            <button className="flex items-center space-x-2">
              <svg 
                className="h-5 w-5 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-white">Account</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
