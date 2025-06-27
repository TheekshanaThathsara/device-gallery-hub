import { useState } from 'react';

export default function QuantitySelector({ onChange, initialQuantity = 1, max = 10 }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const decrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (onChange) onChange(newQuantity);
    }
  };

  const increase = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      if (onChange) onChange(newQuantity);
    }
  };

  const handleChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) value = 1;
    if (value < 1) value = 1;
    if (value > max) value = max;
    
    setQuantity(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={decrease}
        disabled={quantity <= 1}
        className={`flex items-center justify-center w-8 h-8 rounded-l-md border border-r-0 border-gray-300 ${
          quantity <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      
      <input
        type="text"
        className="flex-1 w-12 text-center py-1 border-y border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
        value={quantity}
        onChange={handleChange}
        aria-label="Quantity"
      />
      
      <button
        type="button"
        onClick={increase}
        disabled={quantity >= max}
        className={`flex items-center justify-center w-8 h-8 rounded-r-md border border-l-0 border-gray-300 ${
          quantity >= max ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
