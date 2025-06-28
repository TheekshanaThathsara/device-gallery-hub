import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Use existing images as fallbacks
import chargerImg from '../../assets/images/charger.jpg'; 
import datacableImg from '../../assets/images/datacable.jpg';
import powerbankImg from '../../assets/images/powerbank.jpg';

export default function RelatedProductCard({ product }) {
  const [imgSrc, setImgSrc] = useState(product.image);
  const [imgLoaded, setImgLoaded] = useState(false);

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
      if (product.category === 'cables') {
        setImgSrc(datacableImg);
      } else if (product.category === 'power') {
        setImgSrc(powerbankImg);
      } else {
        setImgSrc(chargerImg);
      }
      setImgLoaded(true);
    };
  }, [product.image, product.category]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={imgSrc} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} 
          onError={(e) => {
            // Fallback handling
            if (product.category === 'cables') {
              setImgSrc(datacableImg);
            } else if (product.category === 'power') {
              setImgSrc(powerbankImg);
            } else {
              setImgSrc(chargerImg);
            }
          }}
        />
        {product.discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            {product.discount}% OFF
          </span>
        )}
      </Link>
      
      <div className="p-3 flex-grow flex flex-col">
        <Link 
          to={`/product/${product.id}`} 
          className="block hover:text-primary-600"
        >
          <div className="mb-1">
            <span className="text-xs text-primary-600 font-medium">
              {product.subcategory}
            </span>
          </div>
          <h3 className="text-secondary-800 font-medium text-sm mb-1 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mt-auto pt-2">
          <span className="text-secondary-900 font-bold text-sm">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-secondary-400 text-xs line-through ml-2">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
