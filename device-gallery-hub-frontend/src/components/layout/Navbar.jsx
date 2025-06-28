import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

// Import local product images
import cable1Img from '../../assets/images/products/cable1.jpg';
import cable2Img from '../../assets/images/products/cable2.jpg';
import cable3Img from '../../assets/images/products/cable3.jpg';
import cable4Img from '../../assets/images/products/cable4.jpeg';
import cable5Img from '../../assets/images/products/cable5.jpeg';
import charger1Img from '../../assets/images/products/charger1.jpg';
import charger2Img from '../../assets/images/products/charger2.jpg';
import earbuds1Img from '../../assets/images/products/earbuds1.jpg';
import earbuds2Img from '../../assets/images/products/earbuds2.jpeg';
import earbuds3Img from '../../assets/images/products/earbuds3.jpg';
import handsfree1Img from '../../assets/images/products/handsfree1.jpg';
import powerbank1Img from '../../assets/images/products/powerbank1.jpg';
import powerbank2Img from '../../assets/images/products/powerbank2.jpg';

// Import fallback images
import chargerImg from '../../assets/images/charger.jpg';
import datacableImg from '../../assets/images/datacable.jpg';
import powerbankImg from '../../assets/images/powerbank.jpg';

// Sample cart data - in a real app, this would come from your state management (Redux, Context API, etc.)
const cartItems = [
  {
    id: 101,
    name: 'Next Gen Type-C Fast Charging Cable',
    price: 16.99,
    quantity: 1,
    image: cable1Img,
    category: 'Cables'
  },
  {
    id: 103,
    name: 'Wireless Earbuds Pro Max',
    price: 89.99,
    quantity: 1,
    image: earbuds1Img,
    category: 'Audio'
  },
  {
    id: 105,
    name: '25000mAh Power Bank with PD',
    price: 49.99,
    quantity: 1,
    image: powerbank1Img,
    category: 'Power'
  }
];

// Additional sample products for the cart
const availableProducts = [
  {
    id: 102,
    name: 'Braided Lightning Cable Pro',
    price: 14.99,
    image: cable2Img,
    category: 'Cables'
  },
  {
    id: 104,
    name: 'Premium Sport Earphones',
    price: 59.99,
    image: earbuds2Img,
    category: 'Audio'
  },
  {
    id: 106,
    name: '65W GaN Fast Charger',
    price: 39.99,
    image: charger1Img,
    category: 'Chargers'
  },
  {
    id: 108,
    name: 'MagSafe Wireless Charger Pro',
    price: 44.99,
    image: charger2Img,
    category: 'Chargers'
  },
  {
    id: 109,
    name: '10000mAh Slim Power Bank',
    price: 29.99,
    image: powerbank2Img,
    category: 'Power'
  },
  {
    id: 110,
    name: 'Premium Tangle-Free USB Cable',
    price: 15.99,
    image: cable3Img,
    category: 'Cables'
  },
  {
    id: 111,
    name: 'Reinforced Gaming USB-C Cable',
    price: 17.99,
    image: cable4Img,
    category: 'Cables'
  },
  {
    id: 113,
    name: 'Studio Quality Earbuds Pro',
    price: 129.99,
    image: earbuds3Img,
    category: 'Audio'
  },
  {
    id: 107,
    name: 'Premium Car Handsfree Kit',
    price: 34.99,
    image: handsfree1Img,
    category: 'Handsfree'
  }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(cartItems);
  const cartPanelRef = useRef(null);
  const cartButtonRef = useRef(null);
  const location = useLocation();

  // Calculate total price and quantity
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

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
    setIsCartOpen(false);
  }, [location.pathname]);

  // Handle clicks outside of cart panel to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isCartOpen && 
        cartPanelRef.current && 
        !cartPanelRef.current.contains(event.target) && 
        cartButtonRef.current && 
        !cartButtonRef.current.contains(event.target)
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen]);

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // Update quantity
  const updateQuantity = (itemId, newQty) => {
    if (newQty < 1) return;
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? {...item, quantity: newQty} : item
      )
    );
  };

  // Add a random product to the cart for demonstration
  const addRandomProduct = () => {
    // Get a random product from the available products
    const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
    
    // Check if the product is already in the cart
    const existingItemIndex = cart.findIndex(item => item.id === randomProduct.id);
    
    if (existingItemIndex >= 0) {
      // If it exists, increase the quantity
      updateQuantity(randomProduct.id, cart[existingItemIndex].quantity + 1);
    } else {
      // Otherwise, add it to the cart with quantity 1
      setCart([...cart, { ...randomProduct, quantity: 1 }]);
    }
  };

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
              <div className="relative">
                <button 
                  ref={cartButtonRef}
                  className="relative p-2 rounded-full transition-colors duration-200 hover:bg-white/10"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  aria-expanded={isCartOpen}
                  aria-label="Open shopping cart"
                >
                  <svg 
                    className="h-5 w-5 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs text-blue-800 font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </button>
                
                {/* Cart Notification Panel */}
                {isCartOpen && (
                  <div 
                    ref={cartPanelRef}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden transform origin-top-right transition-all duration-200"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800">Your Cart</h3>
                      <p className="text-sm text-gray-600">{totalQuantity} items</p>
                    </div>
                    
                    {cart.length > 0 ? (
                      <>
                        <div className="max-h-80 overflow-y-auto">
                          {cart.map(item => (
                            <div key={item.id} className="flex p-3 border-b border-gray-100 hover:bg-gray-50">
                              <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    // Use appropriate fallback image based on category
                                    if (item.category === 'Cables') {
                                      e.target.src = datacableImg;
                                    } else if (item.category === 'Power') {
                                      e.target.src = powerbankImg;
                                    } else {
                                      e.target.src = chargerImg;
                                    }
                                  }}
                                />
                              </div>
                              <div className="ml-3 flex-1">
                                <div className="flex justify-between">
                                  <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                                  <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-400 hover:text-red-500"
                                    aria-label={`Remove ${item.name} from cart`}
                                  >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                                <p className="text-blue-600 text-sm font-semibold">${item.price.toFixed(2)}</p>
                                <div className="flex items-center mt-1">
                                  <button 
                                    className="w-6 h-6 text-gray-600 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    aria-label="Decrease quantity"
                                  >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                    </svg>
                                  </button>
                                  <span className="mx-2 text-sm text-gray-600">{item.quantity}</span>
                                  <button 
                                    className="w-6 h-6 text-gray-600 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    aria-label="Increase quantity"
                                  >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12M6 12h12" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-4 border-t border-gray-100 bg-gray-50">
                          <div className="flex justify-between mb-3">
                            <span className="text-sm text-gray-600">Subtotal</span>
                            <span className="text-sm font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                          </div>
                          <Link 
                            to="/cart" 
                            className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-md shadow-sm transition-colors"
                          >
                            View Cart
                          </Link>
                          <Link 
                            to="/checkout" 
                            className="block w-full mt-2 py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white text-center font-medium rounded-md shadow-sm transition-colors"
                          >
                            Checkout
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="p-6 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <h3 className="mt-4 text-sm font-medium text-gray-700">Your cart is empty</h3>
                        <p className="mt-1 text-sm text-gray-500">Start shopping to add items to your cart</p>
                        <div className="mt-6">
                          <Link
                            to="/shop"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                          >
                            Browse Products
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <Link 
                to="/profile" 
                className="relative p-2 rounded-full transition-colors duration-200 hover:bg-white/10"
                aria-label="User profile"
              >
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
            <button 
              className="flex items-center space-x-2"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
            >
              <svg 
                className="h-5 w-5 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-white">Cart ({totalQuantity})</span>
            </button>
            <Link 
              to="/profile"
              className="flex items-center space-x-2"
            >
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

      {/* Mobile Cart Panel (shows at the bottom for mobile) */}
      {isCartOpen && cart.length > 0 && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-xl max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold text-gray-800">Your Cart ({totalQuantity})</h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {cart.map(item => (
                <div key={item.id} className="flex p-4">
                  <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Use appropriate fallback image based on category
                        if (item.category === 'Cables') {
                          e.target.src = datacableImg;
                        } else if (item.category === 'Power') {
                          e.target.src = powerbankImg;
                        } else {
                          e.target.src = chargerImg;
                        }
                      }}
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-base font-medium text-gray-800">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-blue-600 font-semibold">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button 
                        className="w-8 h-8 text-gray-600 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="mx-3 text-gray-600">{item.quantity}</span>
                      <button 
                        className="w-8 h-8 text-gray-600 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12M6 12h12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <Link 
                to="/cart" 
                className="block w-full py-3 px-4 mb-2 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-md shadow-sm transition-colors"
                onClick={() => setIsCartOpen(false)}
              >
                View Cart
              </Link>
              <Link 
                to="/checkout" 
                className="block w-full py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white text-center font-medium rounded-md shadow-sm transition-colors"
                onClick={() => setIsCartOpen(false)}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
