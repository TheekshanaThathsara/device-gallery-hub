import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderComplete({ orderId, orderData, total }) {
  const estimatedDeliveryDate = () => {
    const today = new Date();
    let deliveryDays = orderData.shippingMethod.type === 'express' ? 3 : 7;
    
    // Add delivery days to current date
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + deliveryDays);
    
    // Format date
    return deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="text-center py-8">
      <div className="mx-auto mb-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-secondary-800 mb-2">Thank you for your order!</h2>
      <p className="text-secondary-600 mb-6">Your order has been received and is now being processed.</p>
      
      <div className="bg-secondary-50 rounded-lg border border-gray-100 p-6 mb-8 max-w-md mx-auto">
        <p className="font-medium text-secondary-800 mb-4">Order Details</p>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-secondary-600">Order Number:</span>
          <span className="text-sm font-medium text-secondary-800">{orderId}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-secondary-600">Order Date:</span>
          <span className="text-sm font-medium text-secondary-800">
            {new Date().toLocaleDateString('en-US', {
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-secondary-600">Total Amount:</span>
          <span className="text-sm font-medium text-secondary-800">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-secondary-600">Shipping Method:</span>
          <span className="text-sm font-medium text-secondary-800">
            {orderData.shippingMethod.type === 'express' ? 'Express Shipping' : 'Standard Shipping'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-secondary-600">Estimated Delivery:</span>
          <span className="text-sm font-medium text-secondary-800">{estimatedDeliveryDate()}</span>
        </div>
      </div>
      
      {/* Shipping Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-100 p-4 text-left">
          <h3 className="font-medium text-secondary-800 mb-2">Shipping Address</h3>
          <p className="text-sm text-secondary-600">
            {orderData.shipping.firstName} {orderData.shipping.lastName}<br />
            {orderData.shipping.address}<br />
            {orderData.shipping.city}, {orderData.shipping.state} {orderData.shipping.zipCode}<br />
            {orderData.shipping.country}
          </p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-100 p-4 text-left">
          <h3 className="font-medium text-secondary-800 mb-2">Payment Method</h3>
          <div className="flex items-center">
            <div className="mr-3 w-10 h-6 bg-secondary-200 rounded flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="text-sm text-secondary-600">
              •••• {orderData.payment.cardNumber.slice(-4)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-secondary-600">
          We've sent a confirmation email to <span className="font-medium text-secondary-800">{orderData.shipping.email}</span>
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            Continue Shopping
          </Link>
          
          <Link
            to="/profile"
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-secondary-700 bg-white hover:bg-secondary-50"
          >
            View Your Orders
          </Link>
        </div>
      </div>
      
      {/* Support Info */}
      <div className="mt-12 p-6 bg-secondary-50 rounded-lg max-w-xl mx-auto">
        <h3 className="font-medium text-secondary-800 mb-3">Need Help?</h3>
        <p className="text-sm text-secondary-600 mb-4">
          If you have any questions about your order, please contact our support team.
        </p>
        <div className="flex justify-center space-x-6">
          <Link to="/support" className="flex items-center text-sm text-primary-600 hover:text-primary-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Visit Support Center
          </Link>
          <Link to="/help-center" className="flex items-center text-sm text-primary-600 hover:text-primary-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
