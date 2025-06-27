import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CategoryCard({ title, imageUrl, description, fallbackImageUrl }) {
  const [imgError, setImgError] = useState(false);
  
  const handleImageError = (e) => {
    // First try fallback image if available
    if (fallbackImageUrl && !e.target.dataset.usedFallback) {
      e.target.dataset.usedFallback = true;
      e.target.src = fallbackImageUrl;
    } 
    // Then try to reload image with timestamp to bypass cache
    else if (!e.target.dataset.retried) {
      e.target.dataset.retried = true;
      e.target.src = `${imageUrl}?retry=${new Date().getTime()}`;
    } 
    // If all fails, show the placeholder
    else {
      setImgError(true);
    }
  };
  
  // Preload images for better performance
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    
    if (fallbackImageUrl) {
      const fallbackImg = new Image();
      fallbackImg.src = fallbackImageUrl;
    }
  }, [imageUrl, fallbackImageUrl]);
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 hover:shadow-primary-100/50 h-full flex flex-col">
      {/* Image container with fixed height */}
      <div className="relative w-full h-60 overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
        {!imgError ? (
          <div className="w-full h-full relative">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 ease-in-out object-center"
              onError={handleImageError}
              loading="eager"
              style={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-30 group-hover:opacity-80 transition-all duration-500"></div>
            
            {/* Product-specific floating elements to enhance the image */}
            {title === 'Power Banks' && (
              <>
                <div className="absolute bottom-4 right-4 z-10 w-16 h-8 bg-blue-600/80 rounded-md blur-sm animate-pulse"></div>
                <div className="absolute top-4 left-4 z-10 w-6 h-6 bg-green-400/50 rounded-full blur-sm animate-pulse" style={{animationDuration: '3s'}}></div>
                <div className="absolute top-1/3 left-1/4 z-10 text-white text-xs font-bold">20000<span className="text-[8px]">mAh</span></div>
              </>
            )}
            {title === 'Chargers' && (
              <>
                <div className="absolute top-1/4 right-1/3 z-10 w-3 h-3 bg-green-400 rounded-full blur-sm animate-ping"></div>
                <div className="absolute bottom-1/3 right-1/4 z-10 w-2 h-2 bg-blue-400 rounded-full blur-sm animate-ping" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-6 right-6 z-10 text-white text-xs font-bold">65W</div>
              </>
            )}
            {title === 'Data Cables' && (
              <>
                <div className="absolute bottom-1/3 left-1/4 z-10 w-16 h-1 bg-blue-300/70 blur-sm"></div>
                <div className="absolute top-1/4 right-1/3 z-10 w-10 h-1 bg-primary-400/60 blur-sm"></div>
                <div className="absolute bottom-6 left-6 z-10 text-white text-xs font-bold">Type-C</div>
              </>
            )}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-300 to-primary-600 flex flex-col items-center justify-center">
            <svg className="w-12 h-12 text-white/70 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-white text-lg font-semibold">{title}</span>
          </div>
        )}
        
        {/* Category badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
          <span className="text-xs font-bold text-primary-600">{title}</span>
        </div>
        
        {/* Hover overlay with quick action */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
          <Link 
            to={`/shop?category=${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="relative z-20 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-sm font-bold text-primary-600 hover:bg-white hover:scale-105 flex items-center"
          >
            {title === 'Power Banks' && "Explore Power Banks"}
            {title === 'Chargers' && "Shop Fast Chargers"}
            {title === 'Data Cables' && "Browse Premium Cables"}
            {title !== 'Power Banks' && title !== 'Chargers' && title !== 'Data Cables' && "View Collection"}
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
      
      <div className="p-6 relative flex-grow flex flex-col">
        {/* Gradient background overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10 flex flex-col flex-grow">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {title === 'Handsfrees' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                )}
                {title === 'Data Cables' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2" />
                )}
                {title === 'Power Banks' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                )}
                {title === 'Chargers' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                )}
                {title === 'Earbuds' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                )}
              </svg>
            </div>
            <h3 className="text-xl font-bold text-secondary-800 group-hover:text-primary-700 transition-colors duration-300">
              {title}
            </h3>
          </div>
          
          <p className="mt-2 text-sm text-secondary-600 leading-relaxed flex-grow line-clamp-2">{description}</p>
          
          {/* Items count and rating */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xs font-semibold bg-primary-100 text-primary-700 px-2.5 py-0.5 rounded-full">
                {Math.floor(Math.random() * 30) + 10} Items
              </span>
            </div>
            
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-3 h-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-xs font-medium text-gray-500">{(4 + Math.random()).toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
