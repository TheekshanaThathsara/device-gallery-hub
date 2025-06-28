import React from 'react';

export default function ReviewOrder({ 
  orderData, 
  cartItems, 
  subtotal, 
  tax, 
  shipping, 
  total, 
  onPlaceOrder,
  onBack,
  isProcessing,
  errors
}) {
  return (
    <div>
      <h2 className="text-xl font-medium text-secondary-800 mb-6">Review Your Order</h2>
      
      {/* Order Summary */}
      <div className="space-y-6">
        {/* Customer & Shipping */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Customer Info */}
          <div className="border border-gray-100 rounded-lg p-4 bg-secondary-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-secondary-800">Customer Information</h3>
              <button 
                onClick={() => onBack()}
                className="text-xs text-primary-600 hover:text-primary-800"
              >
                Edit
              </button>
            </div>
            <p className="text-sm text-secondary-600 mb-1">
              {orderData.shipping.firstName} {orderData.shipping.lastName}
            </p>
            <p className="text-sm text-secondary-600 mb-1">{orderData.shipping.email}</p>
            {orderData.shipping.phone && (
              <p className="text-sm text-secondary-600">{orderData.shipping.phone}</p>
            )}
          </div>
          
          {/* Shipping Info */}
          <div className="border border-gray-100 rounded-lg p-4 bg-secondary-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-secondary-800">Shipping Details</h3>
              <button 
                onClick={() => onBack()}
                className="text-xs text-primary-600 hover:text-primary-800"
              >
                Edit
              </button>
            </div>
            <div className="text-sm text-secondary-600 mb-2">
              <p className="text-sm text-secondary-600 mb-1">
                {orderData.shipping.address}<br />
                {orderData.shipping.city}, {orderData.shipping.state} {orderData.shipping.zipCode}<br />
                {orderData.shipping.country}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium text-secondary-700">
                {orderData.shippingMethod.type === 'express' ? 'Express Shipping (1-3 business days)' : 'Standard Shipping (5-7 business days)'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Payment Info */}
        <div className="border border-gray-100 rounded-lg p-4 bg-secondary-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-secondary-800">Payment Information</h3>
            <button 
              onClick={() => onBack()}
              className="text-xs text-primary-600 hover:text-primary-800"
            >
              Edit
            </button>
          </div>
          <div className="flex items-center">
            <div className="mr-3 w-10 h-6 bg-secondary-200 rounded flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="text-sm text-secondary-600">
              •••• •••• •••• {orderData.payment.cardNumber.slice(-4)}
            </span>
          </div>
          
          {!orderData.billingAddress.sameAsShipping && (
            <div className="mt-3">
              <p className="text-xs text-secondary-500">Billing Address:</p>
              <p className="text-sm text-secondary-600 mt-1">
                {orderData.billingAddress.firstName} {orderData.billingAddress.lastName}<br />
                {orderData.billingAddress.address}<br />
                {orderData.billingAddress.city}, {orderData.billingAddress.state} {orderData.billingAddress.zipCode}<br />
                {orderData.billingAddress.country}
              </p>
            </div>
          )}
        </div>
        
        {/* Order Items */}
        <div className="rounded-lg border border-gray-100 overflow-hidden">
          <h3 className="text-base font-medium text-secondary-800 p-4 bg-secondary-50 border-b border-gray-100">
            Order Items ({cartItems.reduce((count, item) => count + item.quantity, 0)})
          </h3>
          
          <div className="divide-y divide-gray-100">
            {cartItems.map(item => (
              <div key={item.id} className="p-4 flex items-center">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  {item.image ? (
                    <img 
                      src={typeof item.image === 'string' ? item.image : item.image.src || item.image} 
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-500">No image</span>
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1 flex flex-col">
                  <div>
                    <h4 className="text-sm font-medium text-secondary-800">{item.name}</h4>
                    <p className="text-xs text-secondary-500 mt-0.5">{item.subcategory || 'Electronics'}</p>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-secondary-500">Qty {item.quantity}</p>
                    <p className="text-sm font-medium text-secondary-700">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Totals */}
          <div className="p-4 bg-secondary-50 border-t border-gray-100">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Subtotal</span>
                <span className="font-medium text-secondary-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Shipping</span>
                <span className="font-medium text-secondary-800">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Tax</span>
                <span className="font-medium text-secondary-800">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-2 mt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-base font-medium text-secondary-800">Total</span>
                  <span className="text-lg font-bold text-secondary-900">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        {errors?.submit && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-red-700">{errors.submit}</span>
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-sm text-secondary-600 hover:text-secondary-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Return to Payment
          </button>
          
          <button
            type="button"
            onClick={onPlaceOrder}
            disabled={isProcessing}
            className="flex items-center justify-center w-full md:w-auto bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-3 px-8 rounded-md font-medium transition-colors"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Place Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
