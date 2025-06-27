export default function CartSummary({ cartItems, onCheckout }) {
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  // Calculate estimated tax (for example, 8%)
  const taxRate = 0.08;
  const estimatedTax = subtotal * taxRate;
  
  // Calculate shipping (free if subtotal >= $50, otherwise $5.99)
  const shippingThreshold = 50;
  const standardShipping = 5.99;
  const shipping = subtotal >= shippingThreshold ? 0 : standardShipping;
  
  // Calculate total
  const total = subtotal + estimatedTax + shipping;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-medium text-secondary-800 mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-secondary-500">Subtotal ({cartItems.reduce((count, item) => count + item.quantity, 0)} items)</span>
          <span className="text-secondary-800 font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-secondary-500">Estimated Tax</span>
          <span className="text-secondary-800 font-medium">${estimatedTax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-secondary-500">Shipping</span>
          <span className="text-secondary-800 font-medium">
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        
        {shipping > 0 && (
          <div className="text-xs text-secondary-500 pt-1">
            <span className="block">
              Add <span className="font-medium text-primary-600">${(shippingThreshold - subtotal).toFixed(2)}</span> more to qualify for free shipping
            </span>
            <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 rounded-full"
                style={{ width: `${(subtotal / shippingThreshold) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between">
            <span className="text-base font-medium text-secondary-800">Total</span>
            <span className="text-lg font-bold text-secondary-900">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={onCheckout}
        className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
        Proceed to Checkout
      </button>
      
      <div className="mt-6 text-xs text-center text-secondary-500">
        <p>We accept</p>
        <div className="flex justify-center space-x-2 mt-2">
          <div className="w-10 h-6 bg-secondary-100 rounded"></div>
          <div className="w-10 h-6 bg-secondary-100 rounded"></div>
          <div className="w-10 h-6 bg-secondary-100 rounded"></div>
          <div className="w-10 h-6 bg-secondary-100 rounded"></div>
        </div>
      </div>
    </div>
  );
}
