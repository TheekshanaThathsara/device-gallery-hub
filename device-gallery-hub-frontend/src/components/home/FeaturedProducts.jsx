import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [animatedProducts, setAnimatedProducts] = useState([]);
  
  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Type-C Fast Charging Cable',
      category: 'Cables',
      price: 14.99,
      oldPrice: 19.99,
      image: 'https://images.unsplash.com/photo-1589996448606-27d38c70dd4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      badge: 'Best Seller',
      rating: 4.9,
      reviews: 234
    },
    {
      id: 2,
      name: 'Wireless Earbuds Pro',
      category: 'Audio',
      price: 79.99,
      oldPrice: null,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      badge: 'New',
      rating: 4.8,
      reviews: 127
    },
    {
      id: 3,
      name: '20000mAh Power Bank',
      category: 'Power',
      price: 34.99,
      oldPrice: 44.99,
      image: 'https://images.unsplash.com/photo-1609592842337-a2e55b6f8e8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      badge: 'Sale',
      rating: 4.7,
      reviews: 89
    },
    {
      id: 4,
      name: 'Wireless Charging Pad',
      category: 'Chargers',
      price: 24.99,
      oldPrice: null,
      image: 'https://images.unsplash.com/photo-1586953983027-d7508e5a5d49?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      badge: 'Popular',
      rating: 4.6,
      reviews: 156
    }
  ];
  
  // Extract unique categories
  const categories = ['all', ...new Set(featuredProducts.map(product => product.category))];
  
  useEffect(() => {
    // Animate products appearance
    const timer = setTimeout(() => {
      setAnimatedProducts(featuredProducts);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredProducts = activeCategory === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === activeCategory);

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-200 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-200 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4 animate-pulse">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Featured Products
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-800">
            Top Picks
            <span className="text-blue-600 ml-2 relative">
              For You
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-400 rounded-full"></span>
            </span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
            Hand-picked premium accessories that our customers love most
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex justify-center mt-10 mb-8">
          <div className="inline-flex p-1 space-x-1 bg-white rounded-xl shadow-md">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
              style={{ 
                opacity: animatedProducts.includes(product) ? 1 : 0,
                transform: animatedProducts.includes(product) ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease-out ${index * 0.1}s`
              }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1.5 text-xs font-medium rounded-full shadow-md ${getBadgeStyle(product.badge)} transition-transform duration-300 group-hover:scale-110`}>
                    {product.badge}
                  </span>
                </div>
                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                  <Link 
                    to={`/product/${product.id}`}
                    className="bg-white text-blue-600 px-5 py-2.5 rounded-lg font-medium shadow-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 hover:bg-blue-600 hover:text-white"
                  >
                    Quick View
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide bg-blue-50 px-2 py-1 rounded-md">
                    {product.category}
                  </span>
                  {/* Rating */}
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
                    <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <span className="text-sm text-gray-800 ml-1 font-medium">{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-2 line-clamp-2 mt-3">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center justify-between mb-4 mt-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-blue-600">
                      ${product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {product.reviews} reviews
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center group">
                  <svg className="w-5 h-5 mr-2 transform group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link 
            to="/shop" 
            className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-lg font-medium rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            View All Products
            <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
