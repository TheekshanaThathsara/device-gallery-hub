import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback, useMemo } from 'react';
import React from 'react';

// Import local images
import chargerImg from '../../assets/images/charger.jpg';
import datacableImg from '../../assets/images/datacable.jpg';
import powerbankImg from '../../assets/images/powerbank.jpg';
import earbudsImg from '../../assets/images/categories/earbuds.jpg';
import handsfreeImg from '../../assets/images/categories/handsfree.jpg';

// Import product-specific images
import cable1Img from '../../assets/images/products/cable1.jpg';
import cable2Img from '../../assets/images/products/cable2.jpg';
import cable3Img from '../../assets/images/products/cable3.jpg';
import cable4Img from '../../assets/images/products/cable4.jpeg';
import cable5Img from '../../assets/images/products/cable5.jpeg';
import cable6Img from '../../assets/images/products/cable6.jpeg';
import cable7Img from '../../assets/images/products/cable7.jpeg';
import powerbank1Img from '../../assets/images/products/powerbank1.jpg';
import powerbank2Img from '../../assets/images/products/powerbank2.jpg';
import powerbank3Img from '../../assets/images/products/powerbank3.jpeg';
import powerbank4Img from '../../assets/images/products/powerbank4.jpeg';
import powerbank5Img from '../../assets/images/products/powerbank5.jpeg';
import charger1Img from '../../assets/images/products/charger1.jpg';
import charger2Img from '../../assets/images/products/charger2.jpg';
import charger3Img from '../../assets/images/products/charger3.jpeg';
import charger4Img from '../../assets/images/products/charger4.jpeg';
import charger5Img from '../../assets/images/products/charger5.jpeg';
import handsfree1Img from '../../assets/images/products/handsfree1.jpg';
import handsfree2Img from '../../assets/images/products/handsfree2.jpg';
import handsfree3Img from '../../assets/images/products/handsfree3.jpg';
import handsfree4Img from '../../assets/images/products/handsfree4.jpg';
import earbuds1Img from '../../assets/images/products/earbuds1.jpg';
import earbuds2Img from '../../assets/images/products/earbuds2.jpeg';
import earbuds3Img from '../../assets/images/products/earbuds3.jpg';
import earbuds4Img from '../../assets/images/products/earbuds4.jpg';
import earbuds5Img from '../../assets/images/products/earbuds5.jpg';

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [animatedProducts, setAnimatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [productsReady, setProductsReady] = useState(false);
  
  // Stable references to prevent race conditions and memory leaks
  const animationTimeoutRef = React.useRef(null);
  const fadeInTimeoutRef = React.useRef(null);
  const loadingTimeoutRef = React.useRef(null);
  const initialRenderRef = React.useRef(true);
  const imagesLoadedRef = React.useRef(0);
  
  // Product definitions with all necessary information
  const featuredProducts = [
    // Cables Category
    {
      id: 1,
      name: 'Premium Type-C Fast Charging Cable',
      category: 'Cables',
      price: 14.99,
      oldPrice: 19.99,
      image: cable1Img,
      badge: 'Best Seller',
      rating: 4.9,
      reviews: 234,
      isNew: true
    },
    {
      id: 2,
      name: 'Braided Lightning Cable 6ft',
      category: 'Cables',
      price: 12.99,
      oldPrice: 17.99,
      image: cable2Img,
      badge: 'Durable',
      rating: 4.7,
      reviews: 183
    },
    {
      id: 3,
      name: '3-in-1 Charging Cable',
      category: 'Cables',
      price: 19.99,
      oldPrice: 24.99,
      image: cable3Img,
      badge: 'Sale',
      rating: 4.5,
      reviews: 97
    },
    
    // Audio Category
    // {
    //   id: 4,
    //   name: 'Wireless Earbuds Pro',
    //   category: 'Audio',
    //   price: 79.99,
    //   oldPrice: null,
    //   image: earbuds1Img,
    //   badge: 'New',
    //   rating: 4.8,
    //   reviews: 127,
    //   isNew: true
    // },
    // {
    //   id: 5,
    //   name: 'Noise-Cancelling Headphones',
    //   category: 'Audio',
    //   price: 149.99,
    //   oldPrice: 199.99,
    //   image: earbudsImg,
    //   badge: 'Premium',
    //   rating: 4.9,
    //   reviews: 312,
    //   featured: true
    // },
    {
      id: 6,
      name: 'Bluetooth Sports Earphones',
      category: 'Audio',
      price: 49.99,
      oldPrice: 59.99,
      image: earbuds2Img,
      badge: 'Waterproof',
      rating: 4.6,
      reviews: 165
    },
    
    // Power Category
    {
      id: 7,
      name: '20000mAh Power Bank',
      category: 'Power',
      price: 34.99,
      oldPrice: 44.99,
      image: powerbank1Img,
      badge: 'Sale',
      rating: 4.7,
      reviews: 89,
      featured: true
    },
    {
      id: 8,
      name: '10000mAh Slim Power Bank',
      category: 'Power',
      price: 24.99,
      oldPrice: null,
      image: powerbank2Img,
      badge: 'Compact',
      rating: 4.5,
      reviews: 114,
      isNew: true
    },
    {
      id: 9,
      name: 'Wireless Power Bank',
      category: 'Power',
      price: 39.99,
      oldPrice: 49.99,
      image: powerbankImg,
      badge: 'Versatile',
      rating: 4.8,
      reviews: 76
    },
    
    // Chargers Category
    {
      id: 10,
      name: 'Wireless Charging Pad',
      category: 'Chargers',
      price: 24.99,
      oldPrice: null,
      image: charger1Img,
      badge: 'Popular',
      rating: 4.6,
      reviews: 156
    },
    {
      id: 11,
      name: 'Dual Port Fast Charger',
      category: 'Chargers',
      price: 19.99,
      oldPrice: 29.99,
      image: charger2Img,
      badge: 'Quick Charge',
      rating: 4.7,
      reviews: 203,
      featured: true
    },
    {
      id: 12,
      name: 'USB-C GaN Fast Charger',
      category: 'Chargers',
      price: 34.99,
      oldPrice: 44.99,
      image: chargerImg,
      badge: 'Best Seller',
      rating: 4.9,
      reviews: 187,
      isNew: true
    },
    
    // Handsfree Category
    // {
    //   id: 13,
    //   name: 'Bluetooth Car Handsfree Kit',
    //   category: 'Handsfree',
    //   price: 29.99,
    //   oldPrice: 39.99,
    //   image: handsfree1Img,
    //   badge: 'Sale',
    //   rating: 4.5,
    //   reviews: 134
    // },
    // {
    //   id: 14,
    //   name: 'Premium Handsfree Earpiece',
    //   category: 'Handsfree',
    //   price: 49.99,
    //   oldPrice: null,
    //   image: handsfree1Img,
    //   badge: 'HD Audio',
    //   rating: 4.8,
    //   reviews: 91,
    //   featured: true
    // },
    {
      id: 15,
      name: 'Conference Speakerphone',
      category: 'Handsfree',
      price: 89.99,
      oldPrice: 119.99,
      image: handsfree3Img,
      badge: 'Professional',
      rating: 4.7,
      reviews: 68
    },
    
    // More Cables Category
    {
      id: 16,
      name: 'Lightning to HDMI Adapter',
      category: 'Cables',
      price: 24.99,
      oldPrice: 29.99,
      image: datacableImg,
      badge: 'HD Quality',
      rating: 4.4,
      reviews: 87
    },
    {
      id: 17,
      name: 'USB-C to DisplayPort Cable',
      category: 'Cables',
      price: 19.99,
      oldPrice: null,
      image: datacableImg,
      badge: '4K Support',
      rating: 4.6,
      reviews: 102
    },
    
    // More Chargers Category
    {
      id: 18,
      name: 'Travel Adapter Kit',
      category: 'Chargers',
      price: 29.99,
      oldPrice: 39.99,
      image: chargerImg,
      badge: 'International',
      rating: 4.8,
      reviews: 156
    },
    {
      id: 19,
      name: 'MagSafe Wireless Charger',
      category: 'Chargers',
      price: 39.99,
      oldPrice: 49.99,
      image: chargerImg,
      badge: 'Magnetic',
      rating: 4.9,
      reviews: 211
    },
    
    // More Power Banks Category
    {
      id: 20,
      name: 'Solar Power Bank 25000mAh',
      category: 'Power',
      price: 49.99,
      oldPrice: 59.99,
      image: powerbankImg,
      badge: 'Eco-friendly',
      rating: 4.3,
      reviews: 78
    },
    {
      id: 21,
      name: 'Mini Power Bank 5000mAh',
      category: 'Power',
      price: 19.99,
      oldPrice: null,
      image: powerbankImg,
      badge: 'Pocket-size',
      rating: 4.7,
      reviews: 125
    },
    
    // More Audio Category
    {
      id: 22,
      name: 'Gaming Headset with Mic',
      category: 'Audio',
      price: 89.99,
      oldPrice: 109.99,
      image: earbuds3Img,
      badge: 'Gamer',
      rating: 4.8,
      reviews: 315
    },
    {
      id: 23,
      name: 'Bone Conduction Headphones',
      category: 'Audio',
      price: 79.99,
      oldPrice: 99.99,
      image: earbuds4Img,
      badge: 'Innovative',
      rating: 4.5,
      reviews: 98
    }
  ];
  
  // Extract unique categories
  const categories = ['all', ...new Set(featuredProducts.map(product => product.category))];
    
  // Create memoized filtered products to avoid unnecessary recalculations
  const filteredProducts = useMemo(() => {
    return activeCategory === 'all' 
      ? featuredProducts 
      : featuredProducts.filter(product => product.category === activeCategory);
  }, [activeCategory]);

  // Memoize prepared products with stock information to avoid recalculations
  const preparedProducts = useMemo(() => {
    return filteredProducts.map(product => {
      // Deterministic stock status based on product id to avoid random changes
      const stockStatus = product.id % 5 !== 0 ? 'In Stock' : 'Low Stock';
      return {...product, stockStatus};
    });
  }, [filteredProducts]);

  // Preload all product images in a single batch before displaying
  useEffect(() => {
    // Preload all images at once when component mounts
    const preloadAllImages = () => {
      const uniqueImageUrls = Array.from(new Set([
        ...featuredProducts.map(p => p.image)
      ]));
      
      uniqueImageUrls.forEach(url => {
        if (url) {
          const img = new Image();
          img.onload = () => {
            imagesLoadedRef.current += 1;
          };
          img.src = url;
        }
      });
    };
    
    preloadAllImages();
  }, []);

  // Handle category change with improved stability
  useEffect(() => {
    // Clear any existing timeouts to prevent race conditions
    const clearTimeouts = () => {
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      if (fadeInTimeoutRef.current) clearTimeout(fadeInTimeoutRef.current);
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    };
    
    // On first render, show products immediately without animation
    if (initialRenderRef.current) {
      // Pre-loading images to prevent flicker
      preparedProducts.forEach(product => {
        if (product.image) {
          const img = new Image();
          img.src = product.image;
        }
      });
      
      setAnimatedProducts(preparedProducts);
      setIsLoading(false);
      
      // Short delay to ensure DOM has updated before fading in
      setTimeout(() => {
        setFadeIn(true);
        setProductsReady(true);
      }, 50);
      
      initialRenderRef.current = false;
      return;
    }
    
    // Keep current products visible while loading new ones
    clearTimeouts();
    
    // Fade out current products
    setFadeIn(false);
    
    // Preload new images before switching
    const preloadImages = async () => {
      const loadPromises = preparedProducts.map(product => {
        return new Promise((resolve) => {
          if (!product.image) {
            resolve();
            return;
          }
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Continue even if image fails
          img.src = product.image;
        });
      });
      
      // Wait for images to load (with a maximum timeout)
      const timeoutPromise = new Promise(resolve => setTimeout(resolve, 800));
      await Promise.race([Promise.all(loadPromises), timeoutPromise]);
      
      return true;
    };
    
    // Sequence the animation with image preloading
    animationTimeoutRef.current = setTimeout(async () => {
      // Preload images in the background
      await preloadImages();
      
      // Update products without changing visibility state yet
      setAnimatedProducts(preparedProducts);
      setProductsReady(true);
      setIsLoading(false);
      
      // Fade in after a short delay to ensure DOM is ready
      fadeInTimeoutRef.current = setTimeout(() => {
        setFadeIn(true);
      }, 50);
    }, 200);
    
    // Cleanup function
    return clearTimeouts;
  }, [preparedProducts]);

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-yellow-100 text-yellow-800';
      case 'New':
        return 'bg-green-100 text-green-800';
      case 'Sale':
        return 'bg-red-100 text-red-800';
      case 'Popular':
        return 'bg-blue-100 text-blue-800';
      case 'Premium':
        return 'bg-purple-100 text-purple-800';
      case 'Durable':
        return 'bg-amber-100 text-amber-800';
      case 'Waterproof':
        return 'bg-cyan-100 text-cyan-800';
      case 'Compact':
        return 'bg-indigo-100 text-indigo-800';
      case 'Versatile':
        return 'bg-lime-100 text-lime-800';
      case 'Quick Charge':
        return 'bg-orange-100 text-orange-800';
      case 'HD Audio':
        return 'bg-emerald-100 text-emerald-800';
      case 'Professional':
        return 'bg-slate-100 text-slate-800';
      case 'HD Quality':
        return 'bg-fuchsia-100 text-fuchsia-800';
      case '4K Support':
        return 'bg-violet-100 text-violet-800';
      case 'International':
        return 'bg-blue-100 text-blue-800';
      case 'Magnetic':
        return 'bg-indigo-100 text-indigo-800';
      case 'Eco-friendly':
        return 'bg-green-100 text-green-800';
      case 'Pocket-size':
        return 'bg-teal-100 text-teal-800';
      case 'Gamer':
        return 'bg-red-100 text-red-800';
      case 'Innovative':
        return 'bg-sky-100 text-sky-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Only log in development, not in production
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Products updated:', {
        activeCategory,
        count: preparedProducts.length,
        status: productsReady ? 'ready' : 'loading'
      });
    }
  }, [activeCategory, preparedProducts.length, productsReady]);

  // Handle quick view toggle
  const openQuickView = (product) => {
    setQuickViewProduct(product);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };
  
  const closeQuickView = () => {
    setQuickViewProduct(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-200 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-200 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with enhanced design */}
        <div className="text-center relative z-10">
          <div className="relative inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <div className="absolute inset-0 bg-blue-200 rounded-full animate-ping opacity-30"></div>
            <svg className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured Products
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-100 rounded-full blur-2xl opacity-70"></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-800 relative">
              Top Picks
              <span className="text-blue-600 ml-2 relative inline-block">
                For You
                <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full"></span>
              </span>
            </h2>
          </div>
          
          <div className="flex items-center justify-center mt-2">
            <span className="h-1 w-1 rounded-full bg-blue-600 mx-1"></span>
            <span className="h-1 w-1 rounded-full bg-blue-600 mx-1"></span>
            <span className="h-1 w-12 rounded-full bg-blue-600 mx-1"></span>
            <span className="h-1 w-1 rounded-full bg-blue-600 mx-1"></span>
            <span className="h-1 w-1 rounded-full bg-blue-600 mx-1"></span>
          </div>
          
          <p className="mt-5 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
            Hand-picked premium accessories that our customers love most
            <span className="block mt-1 text-sm text-blue-500">Exclusive deals for a limited time only</span>
          </p>
        </div>
        
        {/* Category Filters - Enhanced for mobile */}
        <div className="flex justify-center mt-10 mb-8 overflow-x-auto pb-2 px-2 -mx-2 scrollbar-thin">
          <div className="inline-flex flex-nowrap md:flex-wrap justify-center gap-2 p-2 bg-white rounded-2xl shadow-md border border-gray-50 w-max md:w-auto">
            {categories.map(category => {
              const isActive = activeCategory === category;
              // Get count for each category
              const count = category === 'all' 
                ? featuredProducts.length 
                : featuredProducts.filter(p => p.category === category).length;
                
              return (
                <button
                  key={category}
                  onClick={() => {
                    // Only trigger category change if it's different from current
                    if (category !== activeCategory) {
                      setActiveCategory(category);
                    }
                  }}
                  className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md scale-105'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Filter by ${category} category`}
                >
                  {isActive && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full ${
                    isActive ? 'bg-white text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid - Improved responsive layout */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 product-card-container">
          {isLoading && animatedProducts.length === 0 ? (
            // Loading skeletons - only shown on first load, not on category change
            [...Array(8)].map((_, index) => (
              <div key={`skeleton-${index}`} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-pulse product-card">
                {/* Image skeleton */}
                <div className="product-card-image-container bg-gray-200"></div>
                
                {/* Content skeleton */}
                <div className="product-card-content">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/5"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))
          ) : (
            <>
              {animatedProducts.length > 0 ? animatedProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 relative product-card`}
                  style={{ 
                    opacity: fadeIn ? 1 : 0,
                    transform: fadeIn ? 'translateY(0)' : 'translateY(10px)',
                    transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${Math.min(index * 0.05, 0.4)}s`
                  }}
                >
                  {/* New tag for specific products */}
                  {product.isNew && (
                    <div className="absolute top-0 right-0 z-10">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold py-1 px-3 rounded-bl-lg rounded-tr-lg shadow-md transform -translate-y-0 translate-x-0 rotate-0 origin-top-right group-hover:rotate-3 transition-all duration-300">
                        NEW ARRIVAL
                      </div>
                    </div>
                  )}
                  
                  {/* Featured tag for highlighted products */}
                  {product.featured && (
                    <div className="absolute top-0 left-0 z-10">
                      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold py-1 px-3 rounded-br-lg rounded-tl-lg shadow-md transform -translate-y-0 -translate-x-0 rotate-0 origin-top-left group-hover:-rotate-3 transition-all duration-300">
                        FEATURED
                      </div>
                    </div>
                  )}
                
                {/* Product Image */}
                <div className="relative overflow-hidden product-card-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null; 
                      // Use a local fallback instead of external placeholder
                      if (product.category === 'Cables') {
                        e.target.src = datacableImg;
                      } else if (product.category === 'Power') {
                        e.target.src = powerbankImg;
                      } else if (product.category === 'Chargers') {
                        e.target.src = chargerImg;
                      } else if (product.category === 'Audio') {
                        e.target.src = earbudsImg;
                      } else if (product.category === 'Handsfree') {
                        e.target.src = handsfreeImg;
                      } else {
                        e.target.src = chargerImg; // Default fallback
                      }
                    }}
                    loading={index < 6 ? "eager" : "lazy"}
                    style={{ objectFit: "cover" }}
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1.5 text-xs font-medium rounded-full shadow-md ${getBadgeStyle(product.badge)} transition-transform duration-300 group-hover:scale-110`}>
                      {product.badge}
                    </span>
                  </div>
                  
                  {/* Quick view overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                    <button 
                      onClick={() => openQuickView(product)}
                      className="bg-white text-blue-600 px-5 py-2.5 rounded-lg font-medium shadow-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 hover:bg-blue-600 hover:text-white"
                      aria-label={`Quick view ${product.name}`}
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="product-card-content">
                  <div className="product-card-info">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wide bg-blue-50 px-2 py-1 rounded-md shadow-sm">
                        {product.category}
                      </span>
                      {/* Rating */}
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md shadow-sm" aria-label={`Rated ${product.rating} out of 5`}>
                        <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-800 ml-1 font-medium">{product.rating}</span>
                      </div>
                    </div>
                    
                    {/* Stock status */}
                    <div className="flex items-center mb-1">
                      <span className={`w-2 h-2 rounded-full mr-1.5 ${product.stockStatus === 'In Stock' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                      <span className={`text-xs font-medium ${product.stockStatus === 'In Stock' ? 'text-green-600' : 'text-amber-600'}`}>
                        {product.stockStatus}
                      </span>
                    </div>

                    <div className="relative">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-2 line-clamp-2 mt-3 h-14">
                        {product.name}
                      </h3>
                      {/* Featured star for selected products */}
                      {(product.rating > 4.7 && product.reviews > 200) && (
                        <div className="absolute -right-2 -top-2 flex items-center">
                          <svg className="w-5 h-5 text-yellow-400 filter drop-shadow" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4 mt-3">
                      <div className="flex items-center space-x-2">
                        {product.oldPrice ? (
                          <div className="flex flex-col">
                            <span className="text-xl font-bold text-blue-600">
                              ${product.price}
                            </span>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-400 line-through">
                                ${product.oldPrice}
                              </span>
                              <span className="text-xs text-red-600 ml-1">
                                -{Math.round(100 - (product.price / product.oldPrice) * 100)}%
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xl font-bold text-blue-600">
                            ${product.price}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-1">
                          {product.reviews} reviews
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <div className="product-card-action mt-auto">
                    <button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center group"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <svg className="w-5 h-5 mr-2 transform group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="relative">
                        Add to Cart
                        {product.oldPrice && (
                          <span className="absolute -top-7 -right-6 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm transform rotate-12 animate-pulse">
                            SAVE ${(product.oldPrice - product.price).toFixed(2)}
                          </span>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              )) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-16">
                  <div className="bg-gray-50 rounded-xl p-10">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-700">No products found</h3>
                    <p className="mt-2 text-gray-500">Try selecting a different category or check back later.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Product pagination dots */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300 hover:bg-blue-400 cursor-pointer transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300 hover:bg-blue-400 cursor-pointer transition-colors"></div>
          </div>
        </div>
        
        {/* View More in Selected Category (shown only if a specific category is selected) */}
        {activeCategory !== 'all' && filteredProducts.length > 0 && (
          <div className="mt-6 text-center">
            <Link 
              to={`/shop/${activeCategory.toLowerCase()}`}
              className="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all duration-200 font-medium"
            >
              View all {activeCategory} products
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}

        {/* View All and Category Buttons - Enhanced mobile layout */}
        <div className="mt-12 flex flex-col items-center space-y-6">
          <Link 
            to="/shop" 
            className="group inline-flex items-center px-8 py-4 border-2 border-blue-600 text-lg font-medium rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            View All Products
            <svg className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          {/* Category specific links */}
          <div className="flex flex-wrap justify-center gap-3 max-w-full px-4">
            {categories.filter(cat => cat !== 'all').map(category => (
              <Link 
                key={`view-${category}`}
                to={`/shop/${category.toLowerCase()}`}
                className="inline-flex items-center px-5 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
              >
                Shop {category}
                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick View Modal - Enhanced accessibility */}
      {quickViewProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-0" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeQuickView}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto relative z-10 transform transition-all animate-fadeIn">
            <button 
              onClick={closeQuickView}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 z-20"
              aria-label="Close quick view"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image */}
              <div className="relative h-96 md:h-full bg-gradient-to-br from-blue-50 to-white p-6 flex items-center justify-center">
                <img 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.name}
                  className="max-h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null; 
                    // Use a local fallback based on category
                    if (quickViewProduct.category === 'Cables') {
                      e.target.src = datacableImg;
                    } else if (quickViewProduct.category === 'Power') {
                      e.target.src = powerbankImg;
                    } else if (quickViewProduct.category === 'Chargers') {
                      e.target.src = chargerImg;
                    } else if (quickViewProduct.category === 'Audio') {
                      e.target.src = earbudsImg;
                    } else if (quickViewProduct.category === 'Handsfree') {
                      e.target.src = handsfreeImg;
                    } else {
                      e.target.src = chargerImg; // Default fallback
                    }
                  }}
                  style={{ objectFit: 'contain', maxWidth: '100%' }}
                  loading="eager"
                />
                
                {/* Badge */}
                {quickViewProduct.badge && (
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 text-xs font-medium rounded-full shadow-lg ${getBadgeStyle(quickViewProduct.badge)}`}>
                      {quickViewProduct.badge}
                    </span>
                  </div>
                )}
                
                {/* Status indicators */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {quickViewProduct.isNew && (
                    <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold py-1 px-3 rounded-md shadow-md">
                      NEW ARRIVAL
                    </span>
                  )}
                  {quickViewProduct.featured && (
                    <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold py-1 px-3 rounded-md shadow-md">
                      FEATURED
                    </span>
                  )}
                </div>
              </div>
              
              {/* Product Details */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="mb-2">
                  <span className="text-sm font-bold text-blue-600 uppercase tracking-wide bg-blue-50 px-2 py-1 rounded-md">
                    {quickViewProduct.category}
                  </span>
                </div>
                
                <h3 id="quick-view-title" className="text-2xl font-bold mb-2">{quickViewProduct.name}</h3>
                
                <div className="flex items-center mb-4">
                  <div className="flex mr-2" aria-label={`Rated ${quickViewProduct.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(quickViewProduct.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{quickViewProduct.rating} ({quickViewProduct.reviews} reviews)</span>
                </div>
                
                {/* Price display */}
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-blue-600">
                    ${quickViewProduct.price.toFixed(2)}
                  </span>
                  {quickViewProduct.oldPrice && (
                    <div className="ml-3 flex flex-col">
                      <span className="text-sm text-gray-400 line-through">
                        ${quickViewProduct.oldPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-red-600">
                        Save ${(quickViewProduct.oldPrice - quickViewProduct.price).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Stock status */}
                <div className="flex items-center mb-6">
                  <span className={`w-3 h-3 rounded-full mr-2 ${quickViewProduct.stockStatus === 'In Stock' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                  <span className={`font-medium ${quickViewProduct.stockStatus === 'In Stock' ? 'text-green-600' : 'text-amber-600'}`}>
                    {quickViewProduct.stockStatus}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h4 className="font-bold text-gray-700 mb-2">Product Features:</h4>
                  <ul className="text-gray-600 space-y-1 pl-5">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Premium quality materials for long-lasting durability
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Compatible with all major brands and devices
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      12-month warranty included
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Free shipping on orders over $25
                    </li>
                  </ul>
                </div>
                
                {/* Call to action */}
                <div className="mt-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center"
                      aria-label={`Add ${quickViewProduct.name} to cart`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </button>
                    <button 
                      className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center"
                      aria-label={`Add ${quickViewProduct.name} to wishlist`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
