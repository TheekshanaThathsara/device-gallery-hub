import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 99) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <Link to={`/product/${item.id}`} className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border border-gray-100">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
          onError={(e) => { 
            e.target.onerror = null;
            
            // Try to determine the appropriate fallback based on product type/category
            if (item.subcategory && item.subcategory.toLowerCase().includes('cable')) {
              e.target.src = '/src/assets/images/datacable.jpg';
            } else if (item.subcategory && item.subcategory.toLowerCase().includes('earbuds')) {
              e.target.src = '/src/assets/images/categories/earbuds.jpg';
            } else if (item.subcategory && item.subcategory.toLowerCase().includes('power')) {
              e.target.src = '/src/assets/images/powerbank.jpg';
            } else if (item.subcategory && item.subcategory.toLowerCase().includes('charger')) {
              e.target.src = '/src/assets/images/charger.jpg';
            } else {
              e.target.src = '/src/assets/images/products/cable1.jpg';
            }
          }}
        />
      </Link>

      {/* Product Info */}
      <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 flex-grow">
        <Link 
          to={`/product/${item.id}`}
          className="block text-base font-medium text-secondary-800 hover:text-primary-600 mb-1"
        >
          {item.name}
        </Link>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {item.subcategory && (
            <span className="inline-block px-2 py-0.5 text-xs bg-primary-50 text-primary-700 rounded-full">
              {item.subcategory}
            </span>
          )}
          {item.capacity && (
            <span className="inline-block px-2 py-0.5 text-xs bg-secondary-50 text-secondary-700 rounded-full">
              {item.capacity}
            </span>
          )}
        </div>
        
        <div className="flex items-center text-sm text-secondary-500">
          <span className="font-medium text-secondary-800">${item.price.toFixed(2)}</span>
          {item.oldPrice && (
            <span className="line-through ml-2 text-secondary-400">
              ${item.oldPrice.toFixed(2)}
            </span>
          )}
          {item.discount > 0 && (
            <span className="ml-2 text-red-600 font-medium">
              {item.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="mt-4 sm:mt-0 w-full sm:w-auto sm:ml-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <div className="flex items-center">
          <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
          <div className="flex border border-gray-300 rounded-md">
            <button 
              type="button" 
              onClick={decrementQuantity}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <input
              id={`quantity-${item.id}`}
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-12 text-center border-x border-gray-300 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
            <button 
              type="button" 
              onClick={incrementQuantity}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="text-base font-medium text-secondary-800">
            ${(item.price * quantity).toFixed(2)}
          </span>
          <button
            onClick={() => onRemove(item.id)}
            className="ml-4 text-secondary-400 hover:text-red-500 transition-colors"
            aria-label={`Remove ${item.name} from cart`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
