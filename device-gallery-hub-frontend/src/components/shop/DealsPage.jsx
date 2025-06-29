import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

// Import local images
import chargerImg from '../../assets/images/charger.jpg';
import datacableImg from '../../assets/images/datacable.jpg';
import powerbankImg from '../../assets/images/powerbank.jpg';
import earbudsImg from '../../assets/images/categories/earbuds.jpg';
import handsfreeImg from '../../assets/images/categories/handsfree.jpg';

// Import product images - including more from the available images
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
import powerbank6Img from '../../assets/images/products/powerbank6.jpeg';
import charger1Img from '../../assets/images/products/charger1.jpg';
import charger2Img from '../../assets/images/products/charger2.jpg';
import charger3Img from '../../assets/images/products/charger3.jpeg';
import charger4Img from '../../assets/images/products/charger4.jpeg';
import charger5Img from '../../assets/images/products/charger5.jpeg';
import charger6Img from '../../assets/images/products/charger6.jpeg';
import handsfree1Img from '../../assets/images/products/handsfree1.jpg';
import handsfree2Img from '../../assets/images/products/handsfree2.jpg';
import handsfree3Img from '../../assets/images/products/handsfree3.jpg';
import handsfree4Img from '../../assets/images/products/handsfree4.jpg';
import handsfree5Img from '../../assets/images/products/handsfree5.jpg';
import earbuds1Img from '../../assets/images/products/earbuds1.jpg';
import earbuds2Img from '../../assets/images/products/earbuds2.jpeg';
import earbuds3Img from '../../assets/images/products/earbuds3.jpg';
import earbuds4Img from '../../assets/images/products/earbuds4.jpg';
import earbuds5Img from '../../assets/images/products/earbuds5.jpg';
import earbuds6Img from '../../assets/images/products/earbuds6.jpg';

// Sample deal products data - filtered to only include products with good discounts
const dealProducts = [
  {
    id: 201,
    name: 'Ultra-Fast Charging Cable 100W',
    category: 'Cables',
    subcategory: 'Fast Charging',
    price: 19.99,
    oldPrice: 29.99,
    discount: 33,
    image: cable5Img,
    isFeatured: true,
    dealEnds: '2025-07-15'
  },
  {
    id: 202,
    name: '65W GaN Fast Charger',
    category: 'Chargers',
    subcategory: 'Wall Chargers',
    price: 39.99,
    oldPrice: 59.99,
    discount: 33,
    image: charger1Img,
    isFeatured: true,
    dealEnds: '2025-07-10'
  },
  {
    id: 203,
    name: 'Wireless Earbuds Pro Max',
    category: 'Audio',
    subcategory: 'Earbuds',
    price: 89.99,
    oldPrice: 119.99,
    discount: 25,
    image: earbuds1Img,
    isFeatured: false,
    dealEnds: '2025-07-08'
  },
  {
    id: 204,
    name: 'Premium Sport Earphones',
    category: 'Audio',
    subcategory: 'Earbuds',
    price: 59.99,
    oldPrice: 79.99,
    discount: 25,
    image: earbuds2Img,
    isFeatured: false,
    dealEnds: '2025-07-05'
  },
  {
    id: 205,
    name: '25000mAh Power Bank with PD',
    category: 'Power',
    subcategory: 'Power Banks',
    price: 49.99,
    oldPrice: 69.99,
    discount: 28,
    image: powerbank1Img,
    isFeatured: true,
    dealEnds: '2025-07-20'
  },
  {
    id: 206,
    name: 'Compact 120W GaN Charger',
    category: 'Chargers',
    subcategory: 'GaN',
    price: 49.99,
    oldPrice: 69.99,
    discount: 29,
    image: charger3Img,
    isFeatured: false,
    dealEnds: '2025-07-12'
  },
  {
    id: 207,
    name: 'Braided Lightning Cable Pro',
    category: 'Cables',
    subcategory: 'Lightning',
    price: 14.99,
    oldPrice: 19.99,
    discount: 25,
    image: cable2Img,
    isFeatured: false,
    dealEnds: '2025-07-18'
  },
  {
    id: 208,
    name: 'Premium Home Audio Earbuds',
    category: 'Audio',
    subcategory: 'Home',
    price: 69.99,
    oldPrice: 89.99,
    discount: 22,
    image: earbuds5Img,
    isFeatured: false,
    dealEnds: '2025-07-25'
  },
  {
    id: 209,
    name: 'Gaming Handsfree Headset',
    category: 'Handsfree',
    subcategory: 'Gaming',
    price: 79.99,
    oldPrice: 99.99,
    discount: 20,
    image: handsfree4Img,
    isFeatured: false,
    dealEnds: '2025-07-30'
  },
  {
    id: 210,
    name: 'Solar Powered 30000mAh Power Bank',
    category: 'Power',
    subcategory: 'Solar',
    price: 59.99,
    oldPrice: 79.99,
    discount: 25,
    image: powerbank3Img,
    isFeatured: true,
    dealEnds: '2025-07-08'
  },
  {
    id: 211,
    name: 'Conference Room Speakerphone Pro',
    category: 'Handsfree',
    subcategory: 'Conference',
    price: 119.99,
    oldPrice: 149.99,
    discount: 20,
    image: handsfree3Img,
    isFeatured: false,
    dealEnds: '2025-07-15'
  },
  {
    id: 212,
    name: 'Premium Business Handsfree Earpiece',
    category: 'Handsfree',
    subcategory: 'Business',
    price: 69.99,
    oldPrice: 89.99,
    discount: 22,
    image: handsfree2Img,
    isFeatured: false,
    dealEnds: '2025-07-22'
  }
];

export default function DealsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDiscount, setActiveDiscount] = useState('all');
  const [sortOption, setSortOption] = useState('discount-desc');
  const [filteredProducts, setFilteredProducts] = useState(dealProducts);
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [countdownTimers, setCountdownTimers] = useState({});
  const navigate = useNavigate();
  
  // Extract unique categories
  const categories = ['all', ...new Set(dealProducts.map(product => product.category))];
  
  // Discount filter options
  const discountOptions = [
    { id: 'all', label: 'All Discounts' },
    { id: 'under-20', label: 'Under 20%' },
    { id: '20-25', label: '20% - 25%' },
    { id: 'over-25', label: 'Over 25%' },
  ];

  // Initialize countdown timers for each product
  useEffect(() => {
    const initialTimers = {};
    dealProducts.forEach(product => {
      const endDate = new Date(product.dealEnds);
      const now = new Date();
      const timeRemaining = endDate - now;
      initialTimers[product.id] = timeRemaining > 0 ? timeRemaining : 0;
    });
    setCountdownTimers(initialTimers);
  }, []);

  // Update countdown timers every second
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setCountdownTimers(prevTimers => {
        const updatedTimers = {};
        let hasActiveTimers = false;
        
        for (const [id, timeRemaining] of Object.entries(prevTimers)) {
          if (timeRemaining > 0) {
            updatedTimers[id] = timeRemaining - 1000; // subtract one second
            hasActiveTimers = true;
          } else {
            updatedTimers[id] = 0;
          }
        }
        
        return updatedTimers;
      });
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, []);

  // Format countdown time as days, hours, minutes, seconds
  const formatCountdown = (timeInMs) => {
    if (timeInMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    const seconds = Math.floor((timeInMs / 1000) % 60);
    const minutes = Math.floor((timeInMs / (1000 * 60)) % 60);
    const hours = Math.floor((timeInMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeInMs / (1000 * 60 * 60 * 24));
    
    return { days, hours, minutes, seconds };
  };

  // Filter products when filters change
  useEffect(() => {
    setFadeIn(false);
    setIsLoading(true);
    
    // Short delay to simulate loading and allow fade out
    setTimeout(() => {
      let result = [...dealProducts];

      // Filter by category
      if (activeCategory !== 'all') {
        result = result.filter(product => product.category === activeCategory);
      }
      
      // Filter by discount range
      if (activeDiscount === 'under-20') {
        result = result.filter(product => product.discount < 20);
      } else if (activeDiscount === '20-25') {
        result = result.filter(product => product.discount >= 20 && product.discount <= 25);
      } else if (activeDiscount === 'over-25') {
        result = result.filter(product => product.discount > 25);
      }
      
      // Apply sorting
      if (sortOption === 'price-asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'price-desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (sortOption === 'discount-desc') {
        result.sort((a, b) => b.discount - a.discount);
      } else if (sortOption === 'ending-soon') {
        result.sort((a, b) => new Date(a.dealEnds) - new Date(b.dealEnds));
      }
      
      setFilteredProducts(result);
      setIsLoading(false);
      
      // Small delay to ensure the DOM has updated before fading in
      setTimeout(() => {
        setFadeIn(true);
      }, 100);
      
    }, 300);
  }, [activeCategory, activeDiscount, sortOption]);

  // Calculate days remaining for a deal
  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-red-200 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-red-200 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-gradient-to-r from-yellow-200 via-red-200 to-yellow-200 opacity-10 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back button */}
        <div className="flex justify-start mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 text-sm font-medium rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-50"
            aria-label="Go back"
          >
            <svg className="w-4 h-4 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
        
        {/* Section Header */}
        <div className="text-center relative z-10 mb-12">
          <div className="relative inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-800 text-sm font-medium mb-4">
            <div className="absolute inset-0 bg-red-200 rounded-full animate-ping opacity-30"></div>
            <svg className="w-4 h-4 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            Limited Time Only
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-800 relative">
            Special
            <span className="text-red-600 ml-2 relative inline-block">
              Deals
              <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full"></span>
            </span>
          </h2>
          
          <p className="mt-5 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
            Exclusive discounts on premium accessories
            <span className="block mt-1 text-sm text-red-500">Hurry before they're gone!</span>
          </p>
        </div>

        {/* Horizontal Filter Row */}
        <div className="mb-8">
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => {
                    const isActive = activeCategory === category;
                    const displayName = category === 'all' ? 'All Categories' : category;
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                            : 'text-gray-600 bg-gray-100 hover:bg-red-50 hover:text-red-600'
                        }`}
                        aria-pressed={isActive}
                        aria-label={`Filter by ${displayName}`}
                      >
                        {displayName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Discount Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">Discount Range</h3>
                <div className="flex flex-wrap gap-2">
                  {discountOptions.map(option => {
                    const isActive = activeDiscount === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setActiveDiscount(option.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                            : 'text-gray-600 bg-gray-100 hover:bg-red-50 hover:text-red-600'
                        }`}
                        aria-pressed={isActive}
                        aria-label={`Filter by ${option.label}`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">Sort By</h3>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    aria-label="Sort deals"
                  >
                    <option value="discount-desc">Biggest Discount</option>
                    <option value="ending-soon">Ending Soon</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results count and applied filters */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-3">
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">{filteredProducts.length}</span> deals found
          </p>
          
          <div className="flex flex-wrap items-center gap-2">
            {activeCategory !== 'all' && (
              <div className="inline-flex items-center px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm">
                {activeCategory}
                <button 
                  onClick={() => setActiveCategory('all')}
                  className="ml-1.5 text-red-500 hover:text-red-700"
                  aria-label={`Remove ${activeCategory} filter`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            {activeDiscount !== 'all' && (
              <div className="inline-flex items-center px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm">
                {discountOptions.find(d => d.id === activeDiscount)?.label}
                <button 
                  onClick={() => setActiveDiscount('all')}
                  className="ml-1.5 text-red-500 hover:text-red-700"
                  aria-label={`Remove ${discountOptions.find(d => d.id === activeDiscount)?.label} filter`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            {(activeCategory !== 'all' || activeDiscount !== 'all') && (
              <button 
                onClick={() => {
                  setActiveCategory('all');
                  setActiveDiscount('all');
                }}
                className="text-sm text-red-600 hover:underline"
                aria-label="Clear all filters"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Featured Deals (Top Row) */}
        {activeCategory === 'all' && activeDiscount === 'all' && (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured Deals
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
              {dealProducts
                .filter(product => product.isFeatured)
                .map((product, index) => (
                  <div 
                    key={product.id}
                    className="transition-all duration-500 h-full"
                    style={{
                      opacity: fadeIn ? 1 : 0,
                      transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.4s ease ${Math.min(index * 0.05, 0.5)}s`
                    }}
                  >
                    <div className="relative h-full">
                      {/* Deal badge */}
                      <div className="absolute top-0 left-0 z-10">
                        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold py-1 px-3 rounded-br-lg rounded-tl-lg shadow-md">
                          SAVE {product.discount}%
                        </div>
                      </div>
                      
                      {/* Countdown timer */}
                      <div className="absolute top-0 right-0 z-10">
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-xs font-bold py-1 px-3 rounded-bl-lg rounded-tr-lg shadow-md text-white">
                          {getDaysRemaining(product.dealEnds)} DAYS LEFT
                        </div>
                      </div>
                      
                      <div className="h-full">
                        <ProductCard product={{
                          id: product.id,
                          name: product.name,
                          subcategory: product.subcategory,
                          price: product.price,
                          oldPrice: product.oldPrice,
                          discount: product.discount,
                          image: product.image
                        }} />
                      </div>
                      
                      {/* Countdown display */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-2xl">
                        <div className="flex justify-center space-x-2 text-xs font-medium text-white">
                          <div className="flex flex-col items-center">
                            <span className="bg-black bg-opacity-60 rounded-md w-8 h-8 flex items-center justify-center text-lg">
                              {formatCountdown(countdownTimers[product.id]).days}
                            </span>
                            <span>Days</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="bg-black bg-opacity-60 rounded-md w-8 h-8 flex items-center justify-center text-lg">
                              {formatCountdown(countdownTimers[product.id]).hours}
                            </span>
                            <span>Hrs</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="bg-black bg-opacity-60 rounded-md w-8 h-8 flex items-center justify-center text-lg">
                              {formatCountdown(countdownTimers[product.id]).minutes}
                            </span>
                            <span>Min</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="bg-black bg-opacity-60 rounded-md w-8 h-8 flex items-center justify-center text-lg">
                              {formatCountdown(countdownTimers[product.id]).seconds}
                            </span>
                            <span>Sec</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* All Deals */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
            </svg>
            {activeCategory === 'all' && activeDiscount === 'all' ? 'All Deals' : 'Matching Deals'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {isLoading ? (
              // Loading skeletons - using consistent height to avoid layout shift
              [...Array(8)].map((_, index) => (
                <div key={`skeleton-${index}`} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-pulse h-full">
                  {/* Image skeleton */}
                  <div className="w-full aspect-square bg-gray-200"></div>
                  
                  {/* Content skeleton */}
                  <div className="p-6">
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
              filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className="transition-all duration-500 h-full"
                    style={{
                      opacity: fadeIn ? 1 : 0,
                      transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.4s ease ${Math.min(index * 0.05, 0.5)}s`
                    }}
                  >
                    <div className="relative h-full">
                      {/* Deal badge */}
                      <div className="absolute top-0 left-0 z-10">
                        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold py-1 px-3 rounded-br-lg rounded-tl-lg shadow-md">
                          SAVE {product.discount}%
                        </div>
                      </div>
                      
                      {/* Days left badge */}
                      <div className="absolute top-0 right-0 z-10">
                        <div className="bg-black bg-opacity-60 text-xs font-bold py-1 px-3 rounded-bl-lg rounded-tr-lg shadow-md text-white">
                          {getDaysRemaining(product.dealEnds)} DAYS LEFT
                        </div>
                      </div>
                      
                      <div className="h-full">
                        <ProductCard product={{
                          id: product.id,
                          name: product.name,
                          subcategory: product.subcategory,
                          price: product.price,
                          oldPrice: product.oldPrice,
                          discount: product.discount,
                          image: product.image
                        }} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-16">
                  <div className="bg-white rounded-xl p-10">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-700">No deals found</h3>
                    <p className="mt-2 text-gray-500">Try selecting different filter options or check back later for new deals.</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        
        {/* Browse more section */}
        <div className="mt-16 text-center">
          <p className="text-secondary-600 mb-6">Looking for more products?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/shop" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Browse All Products
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link 
              to="/new-arrivals" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              New Arrivals
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
