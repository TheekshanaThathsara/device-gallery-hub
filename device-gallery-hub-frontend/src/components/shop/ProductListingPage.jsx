import { useState, useEffect } from 'react';
import SidebarFilter from './SidebarFilter';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

// Import local images
import chargerImg from '../../assets/images/charger.jpg';
import datacableImg from '../../assets/images/datacable.jpg';
import powerbankImg from '../../assets/images/powerbank.jpg';
import earbudsImg from '../../assets/images/categories/earbuds.jpg';
import handsfreeImg from '../../assets/images/categories/handsfree.jpg';

// Import product images
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

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: 'Premium Type-C Fast Charging Cable',
    category: 'data-cables',
    subcategory: 'Type-C',
    price: 14.99,
    oldPrice: 19.99,
    discount: 25,
    image: cable1Img,
  },
  {
    id: 2,
    name: 'Micro USB Data Cable 2m',
    category: 'data-cables',
    subcategory: 'Micro',
    price: 9.99,
    oldPrice: null,
    discount: 0,
    image: cable2Img,
  },
  {
    id: 3,
    name: 'Lightning Cable for iOS Devices',
    category: 'data-cables',
    subcategory: 'Lightning',
    price: 19.99,
    oldPrice: 24.99,
    discount: 20,
    image: cable3Img,
  },
  {
    id: 4,
    name: 'Wireless Bluetooth Earbuds with Noise Cancellation',
    category: 'earbuds',
    subcategory: 'Wireless',
    price: 89.99,
    oldPrice: 119.99,
    discount: 25,
    image: earbuds1Img,
  },
  {
    id: 5,
    name: 'Fast Charging Type-C Power Adapter',
    category: 'chargers',
    subcategory: 'Type-C',
    price: 24.99,
    oldPrice: null,
    discount: 0,
    image: charger1Img,
  },
  {
    id: 6,
    name: 'Portable Power Bank 10000mAh',
    category: 'power-banks',
    subcategory: null,
    capacity: '10000mah',
    price: 39.99,
    oldPrice: 49.99,
    discount: 20,
    image: powerbank1Img,
  },
  {
    id: 7,
    name: 'Wired Handsfree with Mic',
    category: 'handsfree',
    subcategory: 'Micro',
    price: 12.99,
    oldPrice: 14.99,
    discount: 13,
    image: handsfree1Img,
  },
  {
    id: 8,
    name: 'Ultra Slim Power Bank 5000mAh',
    category: 'power-banks',
    subcategory: null,
    capacity: '5000mah',
    price: 29.99,
    oldPrice: null,
    discount: 0,
    image: powerbank2Img,
  },
  {
    id: 9,
    name: 'Premium Type-C Handsfree with Noise Cancellation',
    category: 'handsfree',
    subcategory: 'Type-C',
    price: 34.99,
    oldPrice: 44.99,
    discount: 22,
    image: handsfree2Img,
  },
  {
    id: 10,
    name: 'High Capacity Power Bank 20000mAh',
    category: 'power-banks',
    subcategory: null,
    capacity: '20000mah',
    price: 59.99,
    oldPrice: 69.99,
    discount: 14,
    image: powerbank3Img,
  },
  {
    id: 11,
    name: 'Dual Port USB Charger',
    category: 'chargers',
    subcategory: null,
    price: 19.99,
    oldPrice: null,
    discount: 0,
    image: charger2Img,
  },
  {
    id: 12,
    name: 'Wireless Charging Pad',
    category: 'chargers',
    subcategory: 'Wireless',
    price: 29.99,
    oldPrice: 39.99,
    discount: 25,
    image: charger3Img,
  },
  {
    id: 13,
    name: 'Bone Conduction Sports Earphones',
    category: 'earbuds',
    subcategory: 'Sports',
    price: 95.99,
    oldPrice: 115.99,
    discount: 17,
    image: earbuds4Img,
  },
  {
    id: 14,
    name: 'Premium Home Audio Earbuds',
    category: 'earbuds',
    subcategory: 'Home',
    price: 69.99,
    oldPrice: 89.99,
    discount: 22,
    image: earbuds5Img,
  },
  {
    id: 15,
    name: 'Conference Room Speakerphone Pro',
    category: 'handsfree',
    subcategory: 'Conference',
    price: 119.99,
    oldPrice: 149.99,
    discount: 20,
    image: handsfree3Img,
  },
  {
    id: 16,
    name: 'Gaming Handsfree Headset',
    category: 'handsfree',
    subcategory: 'Gaming',
    price: 79.99,
    oldPrice: 99.99,
    discount: 20,
    image: handsfree4Img,
  }
];

export default function ProductListingPage() {
  const [products, setProducts] = useState(sampleProducts);
  const [filters, setFilters] = useState({
    categories: {},
    subcategories: {},
    capacities: {},
    priceRange: [0, 200]
  });
  const [sortOption, setSortOption] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract unique categories for filter display
  const categories = ['all', ...new Set(sampleProducts.map(product => product.category))];
  
  // Filter products when filters change
  useEffect(() => {
    let result = [...sampleProducts];
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    // Filter by selected categories
    const selectedCategories = Object.keys(filters.categories).filter(key => filters.categories[key]);
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Filter by selected subcategories
    const selectedSubcategories = Object.keys(filters.subcategories).filter(key => filters.subcategories[key]);
    if (selectedSubcategories.length > 0) {
      result = result.filter(product => 
        product.subcategory && selectedSubcategories.includes(product.subcategory.toLowerCase())
      );
    }
    
    // Filter by selected capacities
    const selectedCapacities = Object.keys(filters.capacities).filter(key => filters.capacities[key]);
    if (selectedCapacities.length > 0) {
      result = result.filter(product => 
        product.capacity && selectedCapacities.includes(product.capacity.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'discount') {
      result.sort((a, b) => b.discount - a.discount);
    }
    
    setFilteredProducts(result);
  }, [filters, sortOption]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  // Effect to simulate loading and fade in
  useEffect(() => {
    setFadeIn(false);
    setIsLoading(true);
    
    // Short delay to simulate loading and allow fade out
    setTimeout(() => {
      setIsLoading(false);
      
      // Small delay to ensure the DOM has updated before fading in
      setTimeout(() => {
        setFadeIn(true);
      }, 100);
    }, 300);
  }, [filters, sortOption]);
  
  // Count active filters
  const getActiveFiltersCount = () => {
    const categoryCount = Object.values(filters.categories).filter(Boolean).length;
    const subcategoryCount = Object.values(filters.subcategories).filter(Boolean).length;
    const capacityCount = Object.values(filters.capacities).filter(Boolean).length;
    const priceModified = filters.priceRange[0] > 0 || filters.priceRange[1] < 200;
    
    return categoryCount + subcategoryCount + capacityCount + (priceModified ? 1 : 0);
  };
  
  const clearAllFilters = () => {
    setFilters({
      categories: {},
      subcategories: {},
      capacities: {},
      priceRange: [0, 200]
    });
  };
  
  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-200 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-200 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center relative z-10 mb-12">
          <div className="relative inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <div className="absolute inset-0 bg-blue-200 rounded-full animate-ping opacity-30"></div>
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
            Browse Our Collection
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-800 relative">
            Shop
            <span className="text-blue-600 ml-2 relative inline-block">
              All Products
              <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full"></span>
            </span>
          </h2>
          
          <p className="mt-5 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
            Explore our full range of premium mobile accessories
            <span className="block mt-1 text-sm text-blue-500">Quality products at affordable prices</span>
          </p>
        </div>
        
        {/* Horizontal Filter Row - New Design */}
        <div className="mb-8">
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {/* Filter Section */}
              <div className="col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Filter Products</h3>
                  {getActiveFiltersCount() > 0 && (
                    <button 
                      onClick={clearAllFilters}
                      className="text-sm text-blue-600 hover:underline font-medium"
                      aria-label="Clear all filters"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
                <SidebarFilter onFilterChange={handleFilterChange} />
              </div>
              
              {/* View and Sort Section */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-4">View & Sort</h3>
                <div className="space-y-4">
                  {/* View Toggle */}
                  <div className="flex items-center bg-white rounded-xl border border-gray-100 p-1">
                    <button 
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                      aria-pressed={viewMode === 'grid'}
                      className={`flex-1 p-2 rounded-lg transition-all duration-200 text-center ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-blue-500 hover:bg-gray-50'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span className="text-xs mt-1 block">Grid</span>
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      aria-label="List view"
                      aria-pressed={viewMode === 'list'}
                      className={`flex-1 p-2 rounded-lg transition-all duration-200 text-center ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-blue-500 hover:bg-gray-50'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      <span className="text-xs mt-1 block">List</span>
                    </button>
                  </div>
                  
                  {/* Sort Options */}
                  <div>
                    <h3 className="text-xs text-gray-500 mb-2">Sort By</h3>
                    <div className="relative">
                      <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        aria-label="Sort products"
                      >
                        <option value="featured">Featured</option>
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
          </div>
        </div>
        
        {/* Results count */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">{filteredProducts.length}</span> products found
          </p>
          
          {getActiveFiltersCount() > 0 && (
            <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
              <span>{getActiveFiltersCount()} {getActiveFiltersCount() === 1 ? 'filter' : 'filters'} applied</span>
              <button 
                onClick={clearAllFilters}
                className="ml-1.5 text-blue-500 hover:text-blue-700"
                aria-label="Clear all filters"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        {/* Product grid/list */}
        <div className="w-full">
          {isLoading ? (
            // Loading skeletons - using consistent height to avoid layout shift
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'
              : 'flex flex-col gap-4'
            }>
              {[...Array(8)].map((_, index) => (
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
              ))}
            </div>
          ) : (
            filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'
                : 'flex flex-col gap-4'
              }>
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className="transition-all duration-500 h-full"
                    style={{
                      opacity: fadeIn ? 1 : 0,
                      transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.4s ease ${Math.min(index * 0.05, 0.5)}s`
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-700">No products found</h3>
                <p className="mt-2 text-gray-500 max-w-md mx-auto">We couldn't find any products matching your filters. Try adjusting your filter criteria or clear all filters.</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )
          )}
        </div>
        
        {/* Browse more section */}
        <div className="mt-16 text-center">
          <p className="text-secondary-600 mb-6">Looking for new products?</p>
          <Link 
            to="/new-arrivals" 
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Check New Arrivals
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
