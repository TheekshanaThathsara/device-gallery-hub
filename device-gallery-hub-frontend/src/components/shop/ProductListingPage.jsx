import { useState, useEffect } from 'react';
import SidebarFilter from './SidebarFilter';
import ProductCard from './ProductCard';

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
    image: 'https://images.unsplash.com/photo-1589996448606-27d38c70dd4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Micro USB Data Cable 2m',
    category: 'data-cables',
    subcategory: 'Micro',
    price: 9.99,
    oldPrice: null,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1583863788434-e62bf5cd4c1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Lightning Cable for iOS Devices',
    category: 'data-cables',
    subcategory: 'Lightning',
    price: 19.99,
    oldPrice: 24.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1609692814859-8cb88f72a3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Wireless Bluetooth Earbuds with Noise Cancellation',
    category: 'earbuds',
    subcategory: 'Wireless',
    price: 89.99,
    oldPrice: 119.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    name: 'Fast Charging Type-C Power Adapter',
    category: 'chargers',
    subcategory: 'Type-C',
    price: 24.99,
    oldPrice: null,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1618478594486-c65b899c4936?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1583863618799-39d4041b2f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 7,
    name: 'Wired Handsfree with Mic',
    category: 'handsfree',
    subcategory: 'Micro',
    price: 12.99,
    oldPrice: 14.99,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1540821924489-7690c70c4eac?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1609592807592-5005a2e94c0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 9,
    name: 'Premium Type-C Handsfree with Noise Cancellation',
    category: 'handsfree',
    subcategory: 'Type-C',
    price: 34.99,
    oldPrice: 44.99,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 11,
    name: 'Dual Port USB Charger',
    category: 'chargers',
    subcategory: null,
    price: 19.99,
    oldPrice: null,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1586813964164-d67dbcf6202d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 12,
    name: 'Wireless Charging Pad',
    category: 'chargers',
    subcategory: 'Wireless',
    price: 29.99,
    oldPrice: 39.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1626686514112-ad59568e6cdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
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
  
  return (
    <div className="bg-secondary-50 min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary-800 mb-4 sm:mb-0">
            Shop All Products
          </h1>
          
          <div className="flex items-center space-x-4">
            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-secondary-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Biggest Discount</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-secondary-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* View mode toggle */}
            <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-secondary-500'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-secondary-500'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <SidebarFilter onFilterChange={handleFilterChange} />
          </div>
          
          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'flex flex-col gap-4'
              }>
                {filteredProducts.map(product => (
                  <div 
                    key={product.id} 
                    className={viewMode === 'list' ? 'w-full' : ''}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-secondary-800 mb-1">No products found</h3>
                <p className="text-secondary-500 text-center max-w-md">
                  We couldn't find any products matching your filters. Try adjusting your filter criteria or clear all filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
