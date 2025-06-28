import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { useCart } from '../../context/CartContext';

// Import some fallback images
import chargerImg from '../../assets/images/charger.jpg';
import datacableImg from '../../assets/images/datacable.jpg';
import powerbankImg from '../../assets/images/powerbank.jpg';
import earbudsImg from '../../assets/images/categories/earbuds.jpg';

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  const navigate = useNavigate();
  
  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-secondary-800 mb-8">Your Shopping Cart</h1>
        <div className="animate-pulse">
          {[1, 2, 3].map(index => (
            <div key={index} className="flex py-6 border-b border-gray-200">
              <div className="h-24 w-24 bg-gray-200 rounded"></div>
              <div className="ml-4 flex-1">
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="ml-6">
                <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-secondary-800 mb-6">Your Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-100">
          <div className="w-16 h-16 mx-auto mb-4 text-secondary-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-secondary-800 mb-2">Your cart is empty</h2>
          <p className="text-secondary-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-secondary-800 mb-6">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              {/* Cart Header */}
              <div className="px-6 py-3 bg-secondary-50 border-b border-gray-200 hidden sm:flex">
                <div className="w-24"></div>
                <div className="flex-grow ml-4">
                  <span className="text-sm font-medium text-secondary-600">Product</span>
                </div>
                <div className="w-32 text-center mr-16">
                  <span className="text-sm font-medium text-secondary-600">Quantity</span>
                </div>
                <div className="w-24 text-right">
                  <span className="text-sm font-medium text-secondary-600">Subtotal</span>
                </div>
              </div>
              
              {/* Cart Items */}
              <div className="px-6">
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
              
              {/* Continue Shopping Link */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </Link>
                <div className="text-sm text-secondary-500">
                  Total items: <span className="font-medium text-secondary-800">{cartItems.reduce((count, item) => count + item.quantity, 0)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div>
            <CartSummary 
              cartItems={cartItems}
              onCheckout={handleCheckout}
            />
            
            <div className="mt-6 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-sm font-medium text-secondary-800 mb-4">Need Help?</h3>
              <div className="space-y-3 text-sm text-secondary-500">
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Have questions about your order?</span>
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Secure checkout</span>
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Free shipping on orders over $50</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
