import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CheckoutSteps from './CheckoutSteps';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import ReviewOrder from './ReviewOrder';
import OrderComplete from './OrderComplete';

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: ''
    },
    payment: {
      cardNumber: '',
      nameOnCard: '',
      expDate: '',
      cvv: '',
      savePaymentInfo: false
    },
    billingAddress: {
      sameAsShipping: true,
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    shippingMethod: {
      type: 'standard',
      price: 0
    }
  });
  
  const [orderId, setOrderId] = useState(null);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  // Calculate order summary
  const taxRate = 0.08;
  const estimatedTax = subtotal * taxRate;
  const shippingCost = orderData.shippingMethod.type === 'express' ? 9.99 : 
                    (orderData.shippingMethod.type === 'standard' ? (subtotal >= 50 ? 0 : 5.99) : 0);
  const total = subtotal + estimatedTax + shippingCost;

  // Check if cart is empty and redirect to cart page
  useEffect(() => {
    if (cartItems.length === 0 && currentStep !== 4) {
      navigate('/cart');
    }
  }, [cartItems, navigate, currentStep]);

  const handleShippingSubmit = (shippingData) => {
    setOrderData(prev => ({
      ...prev,
      shipping: shippingData.shipping,
      shippingMethod: shippingData.shippingMethod
    }));
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (paymentData) => {
    setOrderData(prev => ({
      ...prev,
      payment: paymentData.payment,
      billingAddress: paymentData.billingAddress
    }));
    setCurrentStep(3);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    setOrderProcessing(true);
    // Simulate API call to process order
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate random order ID
      const newOrderId = 'DGH-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(newOrderId);
      
      // Clear cart
      clearCart();
      
      // Move to completion step
      setCurrentStep(4);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error processing order:', error);
      setFormErrors({ submit: 'There was an error processing your order. Please try again.' });
    } finally {
      setOrderProcessing(false);
    }
  };

  const handleBackStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="bg-secondary-50 min-h-screen pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-secondary-800 mb-6">Checkout</h1>
        
        {/* Checkout Steps Progress */}
        <CheckoutSteps currentStep={currentStep} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6">
              {currentStep === 1 && (
                <ShippingForm 
                  initialValues={orderData.shipping}
                  shippingMethod={orderData.shippingMethod}
                  onSubmit={handleShippingSubmit}
                />
              )}
              
              {currentStep === 2 && (
                <PaymentForm 
                  initialValues={{
                    payment: orderData.payment,
                    billingAddress: orderData.billingAddress
                  }}
                  shippingAddress={orderData.shipping}
                  onSubmit={handlePaymentSubmit}
                  onBack={handleBackStep}
                />
              )}
              
              {currentStep === 3 && (
                <ReviewOrder
                  orderData={orderData}
                  cartItems={cartItems}
                  subtotal={subtotal}
                  tax={estimatedTax}
                  shipping={shippingCost}
                  total={total}
                  onPlaceOrder={handlePlaceOrder}
                  onBack={handleBackStep}
                  isProcessing={orderProcessing}
                  errors={formErrors}
                />
              )}
              
              {currentStep === 4 && (
                <OrderComplete 
                  orderId={orderId}
                  orderData={orderData}
                  total={total}
                />
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          {currentStep !== 4 && (
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 sticky top-24">
                <h2 className="text-lg font-medium text-secondary-800 mb-4">Order Summary</h2>
                
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {/* Items Summary */}
                    <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-center py-2 border-b border-gray-100">
                          <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                          <div className="ml-3 flex-1 flex flex-col">
                            <div>
                              <p className="text-sm text-secondary-700 font-medium truncate">{item.name}</p>
                              <p className="text-xs text-secondary-500">{item.subcategory || 'Electronics'}</p>
                            </div>
                            <div className="flex justify-between mt-1">
                              <p className="text-xs text-secondary-500">Qty {item.quantity}</p>
                              <p className="text-xs font-medium text-secondary-700">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Price Summary */}
                    <div className="pt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary-500">Subtotal</span>
                        <span className="text-secondary-800 font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-secondary-500">Shipping</span>
                        <span className="text-secondary-800 font-medium">
                          {shippingCost === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            `$${shippingCost.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-secondary-500">Estimated tax</span>
                        <span className="text-secondary-800 font-medium">${estimatedTax.toFixed(2)}</span>
                      </div>
                      
                      <div className="border-t border-gray-200 mt-4 pt-4">
                        <div className="flex justify-between">
                          <span className="text-base font-medium text-secondary-800">Total</span>
                          <span className="text-lg font-bold text-secondary-900">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 mx-auto mb-4 text-secondary-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <p className="text-secondary-500 mb-4">Your cart is empty</p>
                  </div>
                )}
              </div>
              
              {/* Security Badge */}
              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-100 flex items-center shadow-sm">
                <div className="text-green-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-secondary-800">Secure Checkout</p>
                  <p className="text-xs text-secondary-500">All information is encrypted and secure</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
