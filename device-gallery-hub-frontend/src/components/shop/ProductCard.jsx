import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={product.image} 
            alt={product.name} 
            className={`w-full h-full object-cover transform transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`} 
          />
          {product.discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <div className="mb-1">
          <span className="text-xs text-primary-600 font-medium">
            {product.subcategory}
          </span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-secondary-800 font-medium mb-1 line-clamp-2 min-h-[2.5rem] hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-secondary-900 font-bold">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-secondary-400 text-sm line-through ml-2">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <button 
          className="w-full mt-3 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-6.666zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
