import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

// Use existing images as fallbacks
import chargerImg from '../../assets/images/charger.jpg'; 
import datacableImg from '../../assets/images/datacable.jpg';
import powerbankImg from '../../assets/images/powerbank.jpg';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  
  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = product.image;
    img.onload = () => {
      setImgSrc(product.image);
      setImgLoaded(true);
    };
    img.onerror = () => {
      // Use appropriate fallback image based on category
      if (product.category === 'Cables') {
        setImgSrc(datacableImg);
      } else if (product.category === 'Power') {
        setImgSrc(powerbankImg);
      } else {
        setImgSrc(chargerImg);
      }
      setImgLoaded(true);
    };
  }, [product.image, product.category]);
  
  return (
    <div
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={imgSrc} 
            alt={product.name}
            loading="eager"
            className={`w-full h-full object-cover transform transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'} ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} 
            onError={(e) => {
              // Use appropriate fallback image based on category
              if (product.category === 'Cables') {
                setImgSrc(datacableImg);
              } else if (product.category === 'Power') {
                setImgSrc(powerbankImg);
              } else {
                setImgSrc(chargerImg);
              }
            }}
          />
          {product.discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-1">
          <span className="text-xs text-primary-600 font-medium">
            {product.subcategory}
          </span>
        </div>
        <Link to={`/product/${product.id}`} className="flex-grow">
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
          className={`w-full mt-3 py-2 ${isAdding ? 'bg-green-500' : 'bg-primary-500 hover:bg-primary-600'} text-white text-sm font-medium rounded-md transition-colors duration-300 flex items-center justify-center gap-2`}
          aria-label={`Add ${product.name} to cart`}
          disabled={isAdding}
          onClick={(e) => {
            e.preventDefault();
            setIsAdding(true);
            addToCart(product);
            
            // Show feedback for a brief moment
            setTimeout(() => {
              setIsAdding(false);
            }, 800);
          }}
        >
          {isAdding ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Added!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-6.666zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
