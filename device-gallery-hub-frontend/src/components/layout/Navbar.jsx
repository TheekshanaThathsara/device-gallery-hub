import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartNotificationOpen, setIsCartNotificationOpen] = useState(false);
  const cartNotificationRef = useRef(null);
  const location = useLocation();
  const { cartItems, totalItems, removeItem, updateQuantity } = useCart();

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
  
  // Handle click outside for cart notification panel
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartNotificationRef.current && !cartNotificationRef.current.contains(event.target)) {
        setIsCartNotificationOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartNotificationRef]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-gradient-to-r from-blue-700 to-blue-600 shadow-md py-3`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white/20 backdrop-blur-sm">
              <img 
                src="/dgh.png" 
                alt="Device Gallery Hub Logo" 
                className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Device Gallery Hub
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
                to="/" 
                className={`text-sm font-medium transition-all duration-200 text-white hover:text-yellow-400 hover:scale-105 relative px-1 py-1 group ${
                  location.pathname === '/' ? 'text-yellow-400' : ''
                }`}
              >
                Home
                <span className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-200 ${
                  location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
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
              <div className="relative" ref={cartNotificationRef}>
                <button 
                  className="relative p-2 rounded-full transition-colors duration-200 hover:bg-white/10"
                  onClick={() => setIsCartNotificationOpen(!isCartNotificationOpen)}
                  aria-label="Shopping cart"
                >
                  <svg 
                    className="h-5 w-5 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs text-blue-800 font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </button>
                
                {/* Cart Notification Panel */}
                {isCartNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-200 animate-fadeIn origin-top-right transform transition-all">
                    <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                      <h3 className="font-medium text-gray-700">Your Cart ({totalItems} items)</h3>
                      <button 
                        onClick={() => setIsCartNotificationOpen(false)}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Close cart"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      {cartItems.length === 0 ? (
                        <div className="p-4 text-center">
                          <p className="text-gray-500">Your cart is empty</p>
                        </div>
                      ) : (
                        cartItems.map(item => (
                          <div key={item.id} className="p-3 border-b border-gray-100 flex items-start">
                            <Link to={`/product/${item.id}`} className="w-16 h-16 rounded overflow-hidden flex-shrink-0 border border-gray-200">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => { 
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                                }}
                              />
                            </Link>
                            <div className="ml-3 flex-grow">
                              <Link 
                                to={`/product/${item.id}`} 
                                className="block text-sm font-medium text-gray-800 hover:text-blue-600 truncate max-w-[180px]"
                              >
                                {item.name}
                              </Link>
                              <div className="flex justify-between items-center mt-1">
                                <div className="flex items-center">
                                  <span className="text-xs text-gray-500">Qty:</span>
                                  <select 
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    className="ml-1 text-xs border border-gray-300 rounded p-0.5 bg-transparent"
                                  >
                                    {[...Array(10)].map((_, i) => (
                                      <option key={i} value={i + 1}>
                                        {i + 1}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="text-sm font-medium text-gray-800">
                                  ${item.price.toFixed(2)}
                                </div>
                              </div>
                              <div className="mt-1 flex justify-between items-center">
                                {item.discount > 0 && (
                                  <span className="text-xs font-medium text-red-600">
                                    {item.discount}% OFF
                                  </span>
                                )}
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-xs text-gray-400 hover:text-red-500"
                                  aria-label={`Remove ${item.name}`}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    {cartItems.length > 0 && (
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-600">Subtotal:</span>
                          <span className="text-sm font-bold text-gray-900">
                            ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            to="/cart"
                            className="flex-1 py-2 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 text-center text-sm font-medium rounded-md transition-colors"
                            onClick={() => setIsCartNotificationOpen(false)}
                          >
                            View Cart
                          </Link>
                          <Link
                            to="/checkout"
                            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center text-sm font-medium rounded-md transition-colors"
                            onClick={() => setIsCartNotificationOpen(false)}
                          >
                            Checkout
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <Link to="/profile" className="relative p-2 rounded-full transition-colors duration-200 hover:bg-white/10">
                <svg 
                  className="h-5 w-5 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
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
            to="/" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/' 
                ? 'text-yellow-400 bg-blue-800/50' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            Home
          </Link>
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
            <Link to="/cart" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
              <svg 
                className="h-5 w-5 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <div className="relative text-white">
                Cart ({totalItems})
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-6 bg-yellow-400 text-xs text-blue-800 font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
            <Link to="/profile" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
              <svg 
                className="h-5 w-5 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-white">Account</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
