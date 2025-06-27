import { useState } from 'react';

export default function ImageGallery({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // If no images are provided, use a placeholder
  if (!images || images.length === 0) {
    images = [
      'https://via.placeholder.com/600x600?text=No+Image+Available'
    ];
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Main large image */}
      <div className="flex-1 overflow-hidden rounded-lg bg-white border border-gray-100">
        <div className="relative aspect-square">
          <img 
            src={images[currentImageIndex]} 
            alt="Product image" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Thumbnails - shown horizontally on mobile, vertically on desktop */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-2 md:w-24">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative overflow-hidden rounded border ${
                currentImageIndex === index 
                  ? 'border-primary-500 ring-2 ring-primary-300' 
                  : 'border-gray-200 hover:border-primary-300'
              } transition-all duration-200 aspect-square`}
            >
              <img 
                src={img} 
                alt={`Product thumbnail ${index + 1}`}
                className="w-full h-full object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
