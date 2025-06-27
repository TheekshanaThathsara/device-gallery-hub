import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isScrolled ? 'bg-blue-600' : 'bg-white/20 backdrop-blur-sm'}`}>
              <svg 
                className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-white'} transition-transform duration-300 group-hover:rotate-12`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <span className={`text-lg font-bold tracking-tight ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              Device Gallery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search */}
            <div className={`relative transition-all duration-300 ${
              isScrolled ? 'w-64' : 'w-48 hover:w-64'
            }`}>
              <input
                type="text"
                placeholder="Search products..."
                className={`w-full py-2 pl-10 pr-4 rounded-full text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isScrolled 
                    ? 'bg-gray-100 text-gray-700 focus:ring-blue-500 focus:bg-white' 
                    : 'bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:ring-white/50 focus:bg-white/20'
                }`}
              />
              <div className="absolute left-3 top-2.5">
                <svg 
                  className={`h-4 w-4 ${isScrolled ? 'text-gray-500' : 'text-white/70'}`} 
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
                className={`text-sm font-medium transition-all duration-200 ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-blue-600' 
                    : 'text-white/90 hover:text-white'
                } hover:scale-105 relative px-1 py-1 group`}
              >
                Shop
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-200"></span>
              </Link>
              <Link 
                to="/new-arrivals" 
                className={`text-sm font-medium transition-all duration-200 ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-blue-600' 
                    : 'text-white/90 hover:text-white'
                } hover:scale-105 relative px-1 py-1 group`}
              >
                New Arrivals
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-200"></span>
              </Link>
              <Link 
                to="/deals" 
                className={`text-sm font-medium transition-all duration-200 ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-blue-600' 
                    : 'text-white/90 hover:text-white'
                } hover:scale-105 relative px-1 py-1 group`}
              >
                Deals
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-200"></span>
              </Link>
              <Link 
                to="/support" 
                className={`text-sm font-medium transition-all duration-200 ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-blue-600' 
                    : 'text-white/90 hover:text-white'
                } hover:scale-105 relative px-1 py-1 group`}
              >
                Support
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-200"></span>
              </Link>
            </div>

            {/* Cart & Account */}
            <div className="flex items-center space-x-4">
              <button className={`relative p-2 rounded-full transition-colors duration-200 ${
                isScrolled 
                  ? 'hover:bg-gray-100' 
                  : 'hover:bg-white/10'
              }`}>
                <svg 
                  className={`h-5 w-5 ${isScrolled ? 'text-gray-600' : 'text-white'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs text-blue-800 font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <button className={`relative p-2 rounded-full transition-colors duration-200 ${
                isScrolled 
                  ? 'hover:bg-gray-100' 
                  : 'hover:bg-white/10'
              }`}>
                <svg 
                  className={`h-5 w-5 ${isScrolled ? 'text-gray-600' : 'text-white'}`} 
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
              className={`p-2 rounded-md ${
                isScrolled 
                  ? 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
          isScrolled ? 'bg-white' : 'bg-blue-600/95 backdrop-blur-sm'
        }`}>
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search products..."
              className={`w-full py-2 pl-10 pr-4 rounded-lg text-sm focus:outline-none focus:ring-2 ${
                isScrolled 
                  ? 'bg-gray-100 text-gray-700 focus:ring-blue-500' 
                  : 'bg-white/10 text-white placeholder-white/70 focus:ring-white/50'
              }`}
            />
            <div className="absolute left-7 top-16">
              <svg 
                className={`h-4 w-4 ${isScrolled ? 'text-gray-500' : 'text-white/70'}`} 
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
              isScrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            Shop
          </Link>
          <Link 
            to="/new-arrivals" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isScrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            New Arrivals
          </Link>
          <Link 
            to="/deals" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isScrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            Deals
          </Link>
          <Link 
            to="/support" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isScrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            Support
          </Link>
          <div className="flex items-center justify-between px-3 py-2 border-t border-white/10 mt-2">
            <button className="flex items-center space-x-2">
              <svg 
                className={`h-5 w-5 ${isScrolled ? 'text-gray-600' : 'text-white'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className={`${isScrolled ? 'text-gray-700' : 'text-white'}`}>Cart (3)</span>
            </button>
            <button className="flex items-center space-x-2">
              <svg 
                className={`h-5 w-5 ${isScrolled ? 'text-gray-600' : 'text-white'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className={`${isScrolled ? 'text-gray-700' : 'text-white'}`}>Account</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
