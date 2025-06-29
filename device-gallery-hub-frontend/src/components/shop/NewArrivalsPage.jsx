import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useCart } from '../../context/CartContext';

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

// Sample new arrival product data
const newArrivals = [
  {
    id: 101,
    name: 'Next Gen Type-C Fast Charging Cable',
    category: 'Cables',
    subcategory: 'Type-C',
    price: 16.99,
    oldPrice: 21.99,
    discount: 22,
    image: cable1Img,
    isNew: true,
    arrivalDate: '2025-06-15'
  },
  {
    id: 102,
    name: 'Braided Lightning Cable Pro',
    category: 'Cables',
    subcategory: 'Lightning',
    price: 14.99,
    oldPrice: 19.99,
    discount: 25,
    image: cable2Img,
    isNew: true,
    arrivalDate: '2025-06-10'
  },
  {
    id: 103,
    name: 'Wireless Earbuds Pro Max',
    category: 'Audio',
    subcategory: 'Earbuds',
    price: 89.99,
    oldPrice: 119.99,
    discount: 25,
    image: earbuds1Img,
    isNew: true,
    arrivalDate: '2025-06-20'
  },
  {
    id: 104,
    name: 'Premium Sport Earphones',
    category: 'Audio',
    subcategory: 'Earbuds',
    price: 59.99,
    oldPrice: 79.99,
    discount: 25,
    image: earbuds2Img,
    isNew: true,
    arrivalDate: '2025-06-18'
  },
  {
    id: 105,
    name: '25000mAh Power Bank with PD',
    category: 'Power',
    subcategory: 'Power Banks',
    price: 49.99,
    oldPrice: 69.99,
    discount: 28,
    image: powerbank1Img,
    isNew: true,
    arrivalDate: '2025-06-12'
  },
  {
    id: 106,
    name: '65W GaN Fast Charger',
    category: 'Chargers',
    subcategory: 'Wall Chargers',
    price: 39.99,
    oldPrice: 59.99,
    discount: 33,
    image: charger1Img,
    isNew: true,
    arrivalDate: '2025-06-14'
  },
  {
    id: 107,
    name: 'Premium Car Handsfree Kit',
    category: 'Handsfree',
    subcategory: 'Car Accessories',
    price: 34.99,
    oldPrice: 44.99,
    discount: 22,
    image: handsfree1Img,
    isNew: true,
    arrivalDate: '2025-06-16'
  },
  {
    id: 108,
    name: 'MagSafe Wireless Charger Pro',
    category: 'Chargers',
    subcategory: 'Wireless',
    price: 44.99,
    oldPrice: 54.99,
    discount: 18,
    image: charger2Img,
    isNew: true,
    arrivalDate: '2025-06-22'
  },
  {
    id: 109,
    name: '10000mAh Slim Power Bank',
    category: 'Power',
    subcategory: 'Power Banks',
    price: 29.99,
    oldPrice: 39.99,
    discount: 25,
    image: powerbank2Img,
    isNew: true,
    arrivalDate: '2025-06-19'
  },
  {
    id: 110,
    name: 'Premium Tangle-Free USB Cable',
    category: 'Cables',
    subcategory: 'USB',
    price: 15.99,
    oldPrice: 19.99,
    discount: 20,
    image: cable3Img,
    isNew: true,
    arrivalDate: '2025-06-26'
  },
  {
    id: 111,
    name: 'Reinforced Gaming USB-C Cable',
    category: 'Cables',
    subcategory: 'Gaming',
    price: 17.99,
    oldPrice: 22.99,
    discount: 22,
    image: cable4Img,
    isNew: true,
    arrivalDate: '2025-06-25'
  },
  {
    id: 112,
    name: 'Ultra-Fast Charging Cable 100W',
    category: 'Cables',
    subcategory: 'Fast Charging',
    price: 19.99,
    oldPrice: 29.99,
    discount: 33,
    image: cable5Img,
    isNew: true,
    arrivalDate: '2025-06-27'
  },
  {
    id: 113,
    name: 'Studio Quality Earbuds Pro',
    category: 'Audio',
    subcategory: 'Professional',
    price: 129.99,
    oldPrice: 159.99,
    discount: 19,
    image: earbuds3Img,
    isNew: true,
    arrivalDate: '2025-06-24'
  },
  {
    id: 114,
    name: 'Bone Conduction Sports Earphones',
    category: 'Audio',
    subcategory: 'Sports',
    price: 95.99,
    oldPrice: 115.99,
    discount: 17,
    image: earbuds4Img,
    isNew: true,
    arrivalDate: '2025-06-23'
  },
  {
    id: 115,
    name: 'Premium Home Audio Earbuds',
    category: 'Audio',
    subcategory: 'Home',
    price: 69.99,
    oldPrice: 89.99,
    discount: 22,
    image: earbuds5Img,
    isNew: true,
    arrivalDate: '2025-06-21'
  },
  {
    id: 116,
    name: 'Solar Powered 30000mAh Power Bank',
    category: 'Power',
    subcategory: 'Solar',
    price: 59.99,
    oldPrice: 79.99,
    discount: 25,
    image: powerbank3Img,
    isNew: true,
    arrivalDate: '2025-06-17'
  },
  {
    id: 117,
    name: 'Ultra Slim 5000mAh Card Power Bank',
    category: 'Power',
    subcategory: 'Slim',
    price: 24.99,
    oldPrice: 29.99,
    discount: 17,
    image: powerbank4Img,
    isNew: true,
    arrivalDate: '2025-06-26'
  },
  {
    id: 118,
    name: 'Compact 120W GaN Charger',
    category: 'Chargers',
    subcategory: 'GaN',
    price: 49.99,
    oldPrice: 69.99,
    discount: 29,
    image: charger3Img,
    isNew: true,
    arrivalDate: '2025-06-25'
  },
  {
    id: 119,
    name: 'Foldable Travel Adapter with USB-C',
    category: 'Chargers',
    subcategory: 'Travel',
    price: 35.99,
    oldPrice: 42.99,
    discount: 16,
    image: charger4Img,
    isNew: true,
    arrivalDate: '2025-06-27'
  },
  {
    id: 120,
    name: 'Premium Business Handsfree Earpiece',
    category: 'Handsfree',
    subcategory: 'Business',
    price: 69.99,
    oldPrice: 89.99,
    discount: 22,
    image: handsfree2Img,
    isNew: true,
    arrivalDate: '2025-06-24'
  },
  {
    id: 121,
    name: 'Conference Room Speakerphone Pro',
    category: 'Handsfree',
    subcategory: 'Conference',
    price: 119.99,
    oldPrice: 149.99,
    discount: 20,
    image: handsfree3Img,
    isNew: true,
    arrivalDate: '2025-06-23'
  },
  {
    id: 122,
    name: 'Gaming Handsfree Headset',
    category: 'Handsfree',
    subcategory: 'Gaming',
    price: 79.99,
    oldPrice: 99.99,
    discount: 20,
    image: handsfree4Img,
    isNew: true,
    arrivalDate: '2025-06-21'
  }
];

export default function NewArrivalsPage() {
  const [products, setProducts] = useState(newArrivals);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDuration, setActiveDuration] = useState('all');
  const [sortOption, setSortOption] = useState('latest');
  const [filteredProducts, setFilteredProducts] = useState(newArrivals);
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // Extract unique categories
  const categories = ['all', ...new Set(newArrivals.map(product => product.category))];
  
  // Duration options
  const durationOptions = [
    { id: 'all', label: 'All Time' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
  ];

  // Filter products when filters change
  useEffect(() => {
    setFadeIn(false);
    setIsLoading(true);
    
    // Short delay to simulate loading and allow fade out
    setTimeout(() => {
      let result = [...newArrivals];

      // Filter by category
      if (activeCategory !== 'all') {
        result = result.filter(product => product.category === activeCategory);
      }
      
      // Filter by duration
      const today = new Date();
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      
      if (activeDuration === 'week') {
        result = result.filter(product => {
          const arrivalDate = new Date(product.arrivalDate);
          return arrivalDate >= oneWeekAgo;
        });
      } else if (activeDuration === 'month') {
        result = result.filter(product => {
          const arrivalDate = new Date(product.arrivalDate);
          return arrivalDate >= oneMonthAgo;
        });
      }
      
      // Apply sorting
      if (sortOption === 'price-asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'price-desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (sortOption === 'discount') {
        result.sort((a, b) => b.discount - a.discount);
      } else if (sortOption === 'latest') {
        result.sort((a, b) => new Date(b.arrivalDate) - new Date(a.arrivalDate));
      }
      
      setFilteredProducts(result);
      setIsLoading(false);
      
      // Small delay to ensure the DOM has updated before fading in
      setTimeout(() => {
        setFadeIn(true);
      }, 100);
      
    }, 300);
  }, [activeCategory, activeDuration, sortOption]);

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-200 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-200 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back button */}
        <div className="flex justify-start mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 text-sm font-medium rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-50"
            aria-label="Go back"
          >
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
        
        {/* Section Header */}
        <div className="text-center relative z-10 mb-12">
          <div className="relative inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <div className="absolute inset-0 bg-blue-200 rounded-full animate-ping opacity-30"></div>
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            Just Arrived
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-800 relative">
            New
            <span className="text-blue-600 ml-2 relative inline-block">
              Arrivals
              <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full"></span>
            </span>
          </h2>
          
          <p className="mt-5 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
            Discover our newest products fresh off the shelves
            <span className="block mt-1 text-sm text-blue-500">Get them before they're gone</span>
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
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                            : 'text-gray-600 bg-gray-100 hover:bg-blue-50 hover:text-blue-600'
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

              {/* Duration Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">Time Period</h3>
                <div className="flex flex-wrap gap-2">
                  {durationOptions.map(option => {
                    const isActive = activeDuration === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setActiveDuration(option.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                            : 'text-gray-600 bg-gray-100 hover:bg-blue-50 hover:text-blue-600'
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
                    className="appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    aria-label="Sort products"
                  >
                    <option value="latest">Latest Arrivals</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="discount">Biggest Discount</option>
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
            <span className="font-medium text-gray-800">{filteredProducts.length}</span> products found
          </p>
          
          <div className="flex flex-wrap items-center gap-2">
            {activeCategory !== 'all' && (
              <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                {activeCategory}
                <button 
                  onClick={() => setActiveCategory('all')}
                  className="ml-1.5 text-blue-500 hover:text-blue-700"
                  aria-label={`Remove ${activeCategory} filter`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            {activeDuration !== 'all' && (
              <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                {durationOptions.find(d => d.id === activeDuration)?.label}
                <button 
                  onClick={() => setActiveDuration('all')}
                  className="ml-1.5 text-blue-500 hover:text-blue-700"
                  aria-label={`Remove ${durationOptions.find(d => d.id === activeDuration)?.label} filter`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            {(activeCategory !== 'all' || activeDuration !== 'all') && (
              <button 
                onClick={() => {
                  setActiveCategory('all');
                  setActiveDuration('all');
                }}
                className="text-sm text-blue-600 hover:underline"
                aria-label="Clear all filters"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Products Grid with animation */}
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
                    {/* New arrival badge */}
                    <div className="absolute top-0 left-0 z-10">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold py-1 px-3 rounded-br-lg rounded-tl-lg shadow-md">
                        NEW ARRIVAL
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
                  <h3 className="mt-4 text-lg font-medium text-gray-700">No products found</h3>
                  <p className="mt-2 text-gray-500">Try selecting different filter options or check back later for new arrivals.</p>
                </div>
              </div>
            )
          )}
        </div>
        
        {/* Browse more section */}
        <div className="mt-16 text-center">
          <p className="text-secondary-600 mb-6">Looking for more products?</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Browse All Products
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
