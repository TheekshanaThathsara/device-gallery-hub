import { useState, useEffect, useRef } from 'react';
import RelatedProductCard from './RelatedProductCard';

// Import local images
import cable1Img from '../../assets/images/products/cable1.jpg';
import cable2Img from '../../assets/images/products/cable2.jpg';
import cable3Img from '../../assets/images/products/cable3.jpg';
import cable4Img from '../../assets/images/products/cable4.jpeg';
import cable5Img from '../../assets/images/products/cable5.jpeg';
import powerbank1Img from '../../assets/images/products/powerbank1.jpg';
import powerbank2Img from '../../assets/images/products/powerbank2.jpg';
import powerbank3Img from '../../assets/images/products/powerbank3.jpeg';
import charger1Img from '../../assets/images/products/charger1.jpg';
import charger2Img from '../../assets/images/products/charger2.jpg';
import charger3Img from '../../assets/images/products/charger3.jpeg';
import handsfree1Img from '../../assets/images/products/handsfree1.jpg';
import handsfree2Img from '../../assets/images/products/handsfree2.jpg';
import earbuds1Img from '../../assets/images/products/earbuds1.jpg';
import earbuds2Img from '../../assets/images/products/earbuds2.jpeg';
import earbuds3Img from '../../assets/images/products/earbuds3.jpg';
import earbuds4Img from '../../assets/images/products/earbuds4.jpg';

// Mock products database with categories aligned with ProductDetailsPage
const allProducts = [
  {
    id: 101,
    name: 'Next Gen Type-C Fast Charging Cable',
    category: 'cables',
    subcategory: 'Type-C',
    price: 16.99,
    oldPrice: 21.99,
    discount: 22,
    image: cable1Img,
  },
  {
    id: 102,
    name: 'Braided Lightning Cable Pro',
    category: 'cables',
    subcategory: 'Lightning',
    price: 14.99,
    oldPrice: 19.99,
    discount: 25,
    image: cable2Img,
  },
  {
    id: 103,
    name: 'Wireless Earbuds Pro Max',
    category: 'audio',
    subcategory: 'Earbuds',
    price: 89.99,
    oldPrice: 119.99,
    discount: 25,
    image: earbuds1Img,
  },
  {
    id: 104,
    name: 'Premium Sport Earphones',
    category: 'audio',
    subcategory: 'Earbuds',
    price: 59.99,
    oldPrice: 79.99,
    discount: 25,
    image: earbuds2Img,
  },
  {
    id: 105,
    name: '25000mAh Power Bank with PD',
    category: 'power',
    subcategory: 'Power Banks',
    price: 49.99,
    oldPrice: 69.99,
    discount: 28,
    image: powerbank1Img,
  },
  {
    id: 106,
    name: '65W GaN Fast Charger',
    category: 'chargers',
    subcategory: 'Wall Chargers',
    price: 39.99,
    oldPrice: 59.99,
    discount: 33,
    image: charger1Img,
  },
  {
    id: 107,
    name: 'Premium Car Handsfree Kit',
    category: 'handsfree',
    subcategory: 'Car Accessories',
    price: 34.99,
    oldPrice: 44.99,
    discount: 22,
    image: handsfree1Img,
  },
  {
    id: 108,
    name: 'MagSafe Wireless Charger Pro',
    category: 'chargers',
    subcategory: 'Wireless',
    price: 44.99,
    oldPrice: 54.99,
    discount: 18,
    image: charger2Img,
  },
  {
    id: 109,
    name: '10000mAh Slim Power Bank',
    category: 'power',
    subcategory: 'Power Banks',
    price: 29.99,
    oldPrice: 39.99,
    discount: 25,
    image: powerbank2Img,
  },
  {
    id: 110,
    name: 'Premium Tangle-Free USB Cable',
    category: 'cables',
    subcategory: 'USB',
    price: 15.99,
    oldPrice: 19.99,
    discount: 20,
    image: cable3Img,
  },
  {
    id: 111,
    name: 'Reinforced Gaming USB-C Cable',
    category: 'cables',
    subcategory: 'Gaming',
    price: 17.99,
    oldPrice: 22.99,
    discount: 22,
    image: cable4Img,
  },
  {
    id: 112,
    name: 'Premium Noise-Cancelling Earbuds',
    category: 'audio',
    subcategory: 'Earbuds',
    price: 79.99,
    oldPrice: 99.99,
    discount: 20,
    image: earbuds3Img,
  }
];

export default function RelatedProducts({ currentProductId, category }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const scrollContainer = useRef(null);

  // Find related products based on category
  useEffect(() => {
    // Filter products in same category, exclude current product
    const related = allProducts
      .filter(p => {
        return p.category === category && p.id.toString() !== currentProductId.toString();
      })
      .slice(0, 6); // Limit to 6 products
    
    setRelatedProducts(related);
  }, [currentProductId, category]);

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const { current } = scrollContainer;
      const scrollAmount = direction === 'left' ? -280 : 280;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (relatedProducts.length === 0) {
    return null; // Don't show the section if no related products
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
      <h2 className="text-xl font-bold text-secondary-900 mb-6">Related Products</h2>
      
      <div className="relative">
        {/* Scroll controls */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md text-primary-700 hover:text-primary-800 hover:bg-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div
          ref={scrollContainer}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x scroll-pl-6 scroll-pr-6"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {relatedProducts.map(product => (
            <div key={product.id} className="flex-shrink-0 w-[260px] snap-start">
              <RelatedProductCard product={product} />
            </div>
          ))}
        </div>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md text-primary-700 hover:text-primary-800 hover:bg-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
