import { useState, useEffect, useRef } from 'react';
import RelatedProductCard from './RelatedProductCard';

export default function RelatedProducts({ currentProductId, category }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const scrollContainer = useRef(null);

  // Simulate fetching related products - in a real app, this would be an API call
  useEffect(() => {
    // This is mock data - in a real app, you'd fetch from an API
    const mockProducts = [
      {
        id: 101,
        name: 'Fast Charging Type-C Cable',
        category: 'data-cables',
        subcategory: 'Type-C',
        price: 14.99,
        oldPrice: 19.99,
        discount: 25,
        image: 'https://images.unsplash.com/photo-1589996448606-27d38c70dd4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 102,
        name: 'Premium Lightning Cable',
        category: 'data-cables',
        subcategory: 'Lightning',
        price: 19.99,
        oldPrice: null,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1609692814859-8cb88f72a3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 103,
        name: 'Wireless Earbuds with Case',
        category: 'earbuds',
        subcategory: 'Wireless',
        price: 79.99,
        oldPrice: 99.99,
        discount: 20,
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 104,
        name: '10000mAh Power Bank',
        category: 'power-banks',
        subcategory: null,
        capacity: '10000mah',
        price: 34.99,
        oldPrice: 44.99,
        discount: 22,
        image: 'https://images.unsplash.com/photo-1583863618799-39d4041b2f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 105,
        name: 'Type-C Fast Charger',
        category: 'chargers',
        subcategory: 'Type-C',
        price: 24.99,
        oldPrice: null,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1618478594486-c65b899c4936?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 106,
        name: 'Premium Micro USB Cable',
        category: 'data-cables',
        subcategory: 'Micro',
        price: 9.99,
        oldPrice: 12.99,
        discount: 23,
        image: 'https://images.unsplash.com/photo-1583863788434-e62bf5cd4c1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      },
    ];

    // Filter out the current product and limit to related category products
    const filtered = mockProducts
      .filter(product => product.id !== currentProductId)
      .filter(product => !category || product.category === category)
      .slice(0, 6);

    setRelatedProducts(filtered);
  }, [currentProductId, category]);

  const scroll = (direction) => {
    const container = scrollContainer.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-secondary-800">You may also like</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-gray-200 bg-white text-secondary-600 hover:bg-secondary-50 hover:text-primary-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-gray-200 bg-white text-secondary-600 hover:bg-secondary-50 hover:text-primary-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainer}
          className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {relatedProducts.map((product) => (
            <div key={product.id} className="flex-none w-[220px] md:w-[250px]">
              <RelatedProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Add custom CSS to hide scrollbar
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);
