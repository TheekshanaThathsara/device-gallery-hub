import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Import product images for order summary
import cable1Img from '../../assets/images/products/cable1.jpg';
import earbuds1Img from '../../assets/images/products/earbuds1.jpg';
import powerbank1Img from '../../assets/images/products/powerbank1.jpg';

// Import fallback images
import chargerImg from '../../assets/images/charger.jpg';
import datacableImg from '../../assets/images/datacable.jpg';
import powerbankImg from '../../assets/images/powerbank.jpg';

// Sample cart data - in a real app, this would come from your state management
const sampleCartItems = [
  {
    id: 101,
    name: 'Next Gen Type-C Fast Charging Cable',
    price: 16.99,
    quantity: 1,
    image: cable1Img,
    category: 'Cables'
  },
  {
    id: 103,
    name: 'Wireless Earbuds Pro Max',
    price: 89.99,
    quantity: 1,
    image: earbuds1Img,
    category: 'Audio'
  },
  {
    id: 105,
    name: '25000mAh Power Bank with PD',
    price: 49.99,
    quantity: 1,
    image: powerbank1Img,
    category: 'Power'
  }
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  // Form states
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  // Calculate order summary
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = shippingMethod === 'express' ? 15.99 : (shippingMethod === 'priority' ? 9.99 : 4.99);
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;
  
  // Handle shipping info form changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update billing address if same as shipping
    if (billingAddressSameAsShipping) {
      if (['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'country'].includes(name)) {
        setBillingAddress(prev => ({
          ...prev,
          [name]: value
        }));
      }
    }
  };
  
  // Handle billing address form changes
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle payment form changes
  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle shipping method selection
  const handleShippingMethodChange = (method) => {
    setShippingMethod(method);
  };
  
  // Handle "same as shipping" checkbox
  const handleSameAsShippingChange = (e) => {
    const isChecked = e.target.checked;
    setBillingAddressSameAsShipping(isChecked);
    
    if (isChecked) {
      // Copy shipping details to billing
      setBillingAddress({
        firstName: shippingDetails.firstName,
        lastName: shippingDetails.lastName,
        address: shippingDetails.address,
        city: shippingDetails.city,
        state: shippingDetails.state,
        zipCode: shippingDetails.zipCode,
        country: shippingDetails.country
      });
    }
  };
  
  // Validate shipping form
  const validateShippingForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country'];
    return requiredFields.every(field => shippingDetails[field].trim() !== '');
  };
  
  // Validate billing form
  const validateBillingForm = () => {
    if (billingAddressSameAsShipping) return true;
    
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'country'];
    return requiredFields.every(field => billingAddress[field].trim() !== '');
  };
  
  // Validate payment form
  const validatePaymentForm = () => {
    const requiredFields = ['cardNumber', 'cardName', 'expiryDate', 'cvv'];
    return requiredFields.every(field => paymentDetails[field].trim() !== '');
  };
  
  // Handle form submission for each step
  const handleNextStep = () => {
    if (currentStep === 1 && validateShippingForm()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateBillingForm()) {
      setCurrentStep(3);
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Place order
  const handlePlaceOrder = async () => {
    if (validatePaymentForm()) {
      setIsLoading(true);
      
      // Simulate API call
      try {
        // In a real app, this would be an API call to your backend
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const generatedOrderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        setOrderId(generatedOrderId);
        setOrderPlaced(true);
        setCurrentStep(4);
      } catch (error) {
        console.error('Error placing order:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  // Format credit card number
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Credit card input handler with formatting
  const handleCardNumberInput = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setPaymentDetails(prev => ({
      ...prev,
      cardNumber: formattedValue
    }));
  };
  
  // Format expiry date (MM/YY)
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length > 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };
  
  // Expiry date input handler with formatting
  const handleExpiryDateInput = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setPaymentDetails(prev => ({
      ...prev,
      expiryDate: formattedValue
    }));
  };
  
  // Render different checkout steps
  const renderCheckoutStep = () => {
    switch (currentStep) {
      case 1: // Shipping Information
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={shippingDetails.firstName}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={shippingDetails.lastName}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={shippingDetails.email}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={shippingDetails.phone}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingDetails.address}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingDetails.city}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={shippingDetails.state}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={shippingDetails.zipCode}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                <select
                  id="country"
                  name="country"
                  value={shippingDetails.country}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Shipping Method</h3>
              <div className="space-y-4">
                <div 
                  className={`border rounded-lg p-4 flex items-center cursor-pointer ${shippingMethod === 'standard' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => handleShippingMethodChange('standard')}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${shippingMethod === 'standard' ? 'border-blue-500' : 'border-gray-400'}`}>
                    {shippingMethod === 'standard' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium">Standard Shipping</p>
                    <p className="text-sm text-gray-500">Delivery in 5-7 business days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$4.99</p>
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 flex items-center cursor-pointer ${shippingMethod === 'priority' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => handleShippingMethodChange('priority')}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${shippingMethod === 'priority' ? 'border-blue-500' : 'border-gray-400'}`}>
                    {shippingMethod === 'priority' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium">Priority Shipping</p>
                    <p className="text-sm text-gray-500">Delivery in 2-3 business days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$9.99</p>
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 flex items-center cursor-pointer ${shippingMethod === 'express' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => handleShippingMethodChange('express')}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${shippingMethod === 'express' ? 'border-blue-500' : 'border-gray-400'}`}>
                    {shippingMethod === 'express' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium">Express Shipping</p>
                    <p className="text-sm text-gray-500">Next day delivery</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$15.99</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Link to="/cart" className="flex items-center text-blue-600 hover:text-blue-800">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Return to cart
              </Link>
              <button
                onClick={handleNextStep}
                disabled={!validateShippingForm()}
                className={`px-6 py-2 rounded-md font-medium ${
                  validateShippingForm()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue to Billing
              </button>
            </div>
          </div>
        );
        
      case 2: // Billing Information
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
            
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={billingAddressSameAsShipping}
                  onChange={handleSameAsShippingChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Same as shipping address</span>
              </label>
            </div>
            
            {!billingAddressSameAsShipping && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label htmlFor="billingFirstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    id="billingFirstName"
                    name="firstName"
                    value={billingAddress.firstName}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="billingLastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    id="billingLastName"
                    name="lastName"
                    value={billingAddress.lastName}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    id="billingAddress"
                    name="address"
                    value={billingAddress.address}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    id="billingCity"
                    name="city"
                    value={billingAddress.city}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="billingState" className="block text-sm font-medium text-gray-700 mb-1">State/Province *</label>
                  <input
                    type="text"
                    id="billingState"
                    name="state"
                    value={billingAddress.state}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="billingZipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code *</label>
                  <input
                    type="text"
                    id="billingZipCode"
                    name="zipCode"
                    value={billingAddress.zipCode}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <select
                    id="billingCountry"
                    name="country"
                    value={billingAddress.country}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
              </div>
            )}
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePreviousStep}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Shipping
              </button>
              <button
                onClick={handleNextStep}
                disabled={!validateBillingForm()}
                className={`px-6 py-2 rounded-md font-medium ${
                  validateBillingForm()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        );
        
      case 3: // Payment Information
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            
            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="text-sm text-gray-600">
                <p>We accept the following payment methods:</p>
              </div>
              <div className="flex space-x-2">
                <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10H21M7 15H9M12 15H13M3 8.5V15.5C3 16.0523 3.44772 16.5 4 16.5H20C20.5523 16.5 21 16.0523 21 15.5V8.5C21 7.94772 20.5523 7.5 20 7.5H4C3.44772 7.5 3 7.94772 3 8.5Z" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                {/* Visa */}
                <div className="h-8 w-12 bg-blue-900 rounded flex items-center justify-center">
                  <svg className="h-3 w-9 text-white" viewBox="0 0 36 12" fill="currentColor">
                    <path d="M13.688 1.736L9.274 10.857H7.004L4.814 3.279C4.714 2.909 4.632 2.75 4.282 2.578C3.698 2.295 2.718 2.029 1.864 1.871L1.915 1.736H5.558C5.936 1.736 6.279 2.029 6.364 2.487L7.408 7.434L10.079 1.736H13.688ZM21.713 7.384C21.73 4.717 18.106 4.585 18.143 3.385C18.154 2.978 18.537 2.549 19.39 2.442C19.815 2.388 20.944 2.347 22.207 2.902L22.663 0.84C22.015 0.599 21.192 0.367 20.184 0.367C17.719 0.367 15.982 1.629 15.969 3.436C15.954 4.777 17.177 5.528 18.092 5.993C19.037 6.47 19.358 6.784 19.353 7.214C19.345 7.875 18.58 8.171 17.865 8.183C16.622 8.205 15.886 7.857 15.29 7.599L14.813 9.727C15.413 9.983 16.546 10.209 17.719 10.22C20.355 10.22 22.069 8.974 22.082 6.985L21.713 7.384ZM28.496 10.857H31.136L29.046 0.73H27.041C26.711 0.73 26.431 0.939 26.306 1.236L22.292 10.857H25.055L25.616 9.253H28.832L29.046 10.857H28.496ZM26.356 7.384L27.677 3.676L28.462 7.384H26.356ZM34.817 1.736L32.348 10.857H29.707L32.162 1.736H34.817Z" />
                  </svg>
                </div>
                {/* Mastercard */}
                <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                  <div className="flex">
                    <div className="w-6 h-6 bg-red-500 rounded-full relative -right-1 z-10 opacity-90"></div>
                    <div className="w-6 h-6 bg-yellow-400 rounded-full relative -left-1 z-0 opacity-90"></div>
                  </div>
                </div>
                {/* Amex */}
                <div className="h-8 w-12 bg-blue-500 rounded flex items-center justify-center">
                  <svg className="h-4 w-10 text-white" viewBox="0 0 40 15" fill="currentColor">
                    <path d="M12.635 7.875H17.96V9.574H12.115L12.635 7.875ZM22.215 6.432C21.425 6.432 20.771 6.496 20.183 6.618V5.847H22.863C23.161 5.847 23.387 6.036 23.387 6.294C23.387 6.559 23.161 6.432 22.215 6.432ZM12.722 4.719H17.916V6.432H12.245L12.722 4.719ZM22.215 7.293C22.81 7.293 23.123 7.418 23.123 7.683C23.123 7.927 22.905 8.123 22.577 8.123H20.183V7.439C20.753 7.346 21.463 7.293 22.215 7.293ZM31.255 4.719V6.432H28.764V7.263H31.221V8.769H28.764V9.978H31.255V11.691H27.042V4.719H31.255ZM6.583 4.719L7.745 7.193L8.915 4.719H10.585V9.831L11.855 4.719H13.515L11.536 11.691H9.748L9.722 7.938L8.529 11.691H6.741L4.77 4.719H6.583ZM18.701 4.719H22.905C24.091 4.719 24.875 5.398 24.875 6.3C24.875 6.809 24.631 7.236 24.162 7.515C24.648 7.756 24.918 8.184 24.918 8.728C24.918 9.711 24.117 10.429 22.845 10.429C22.013 10.429 20.353 10.429 18.701 10.429V4.719ZM2.652 4.719H5.271V11.691H2.652V4.719ZM26.528 4.719H28.24V11.691H26.528V4.719ZM36.639 4.719C38.533 4.719 39.992 6.088 39.992 8.199C39.992 10.318 38.533 11.691 36.596 11.691H33.945V4.719H36.639ZM36.526 9.978C37.26 9.978 37.825 9.177 37.825 8.199C37.825 7.23 37.26 6.432 36.526 6.432H35.667V9.978H36.526ZM9.722 6.432L8.529 9.978V6.432H9.722Z" />
                  </svg>
                </div>
                {/* PayPal */}
                <div className="h-8 w-12 bg-blue-700 rounded flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.5 10C6.5 7.51472 8.51472 5.5 11 5.5H14.5C14.7761 5.5 15 5.27614 15 5C15 2.79086 13.2091 1 11 1H6C3.79086 1 2 2.79086 2 5V15.0001C2 17.2092 3.79086 19 6 19H15C17.2091 19 19 17.2092 19 15.0001V10.5C19 10.2239 18.7761 10 18.5 10H11C8.51472 10 6.5 7.98528 6.5 5.5V10Z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                <div className="relative">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handleCardNumberInput}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10"
                    required
                  />
                  <div className="absolute right-3 top-2">
                    {paymentDetails.cardNumber.startsWith('4') && (
                      <svg className="h-5 w-8 text-blue-900" viewBox="0 0 36 12" fill="currentColor">
                        <path d="M13.688 1.736L9.274 10.857H7.004L4.814 3.279C4.714 2.909 4.632 2.75 4.282 2.578C3.698 2.295 2.718 2.029 1.864 1.871L1.915 1.736H5.558C5.936 1.736 6.279 2.029 6.364 2.487L7.408 7.434L10.079 1.736H13.688ZM21.713 7.384C21.73 4.717 18.106 4.585 18.143 3.385C18.154 2.978 18.537 2.549 19.39 2.442C19.815 2.388 20.944 2.347 22.207 2.902L22.663 0.84C22.015 0.599 21.192 0.367 20.184 0.367C17.719 0.367 15.982 1.629 15.969 3.436C15.954 4.777 17.177 5.528 18.092 5.993C19.037 6.47 19.358 6.784 19.353 7.214C19.345 7.875 18.58 8.171 17.865 8.183C16.622 8.205 15.886 7.857 15.29 7.599L14.813 9.727C15.413 9.983 16.546 10.209 17.719 10.22C20.355 10.22 22.069 8.974 22.082 6.985L21.713 7.384ZM28.496 10.857H31.136L29.046 0.73H27.041C26.711 0.73 26.431 0.939 26.306 1.236L22.292 10.857H25.055L25.616 9.253H28.832L29.046 10.857H28.496ZM26.356 7.384L27.677 3.676L28.462 7.384H26.356ZM34.817 1.736L32.348 10.857H29.707L32.162 1.736H34.817Z" />
                      </svg>
                    )}
                    {paymentDetails.cardNumber.startsWith('5') && (
                      <div className="flex">
                        <div className="w-3 h-3 bg-red-500 rounded-full relative -right-0.5 z-10 opacity-90"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full relative -left-0.5 z-0 opacity-90"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card *</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={paymentDetails.cardName}
                  onChange={handlePaymentChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (MM/YY) *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handleExpiryDateInput}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handlePaymentChange}
                    placeholder="123"
                    maxLength="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="pt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="saveCard"
                    checked={paymentDetails.saveCard}
                    onChange={handlePaymentChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Save this card for future purchases</span>
                </label>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePreviousStep}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Billing
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={!validatePaymentForm() || isLoading}
                className={`px-6 py-2 rounded-md font-medium flex items-center ${
                  validatePaymentForm() && !isLoading
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isLoading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        );
        
      case 4: // Order Confirmation
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Thank You For Your Order!</h2>
              <p className="mt-2 text-gray-600">
                Your order has been placed successfully. We'll send you an email confirmation shortly.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Order Number:</span>
                <span className="text-sm font-medium text-gray-900">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Order Date:</span>
                <span className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Use appropriate fallback image based on category
                          if (item.category === 'Cables') {
                            e.target.src = datacableImg;
                          } else if (item.category === 'Power') {
                            e.target.src = powerbankImg;
                          } else {
                            e.target.src = chargerImg;
                          }
                        }}
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Shipping ({shippingMethod === 'express' ? 'Express' : shippingMethod === 'priority' ? 'Priority' : 'Standard'})</span>
                <span className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Tax</span>
                <span className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-base font-medium text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Shipping Information</h3>
              <p className="text-sm text-gray-600">
                {shippingDetails.firstName} {shippingDetails.lastName}<br />
                {shippingDetails.address}<br />
                {shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}<br />
                {shippingDetails.country}
              </p>
            </div>
            
            <div className="flex justify-between">
              <Link to="/shop" className="text-blue-600 hover:text-blue-800 font-medium">
                Continue Shopping
              </Link>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
              >
                Go to Home
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Checkout Progress Steps
  const renderCheckoutProgress = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {/* Step 1: Shipping */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > 1 ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>1</span>
              )}
            </div>
            <span className={`mt-2 text-xs ${currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Shipping</span>
          </div>
          
          {/* Progress line 1-2 */}
          <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          
          {/* Step 2: Billing */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > 2 ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>2</span>
              )}
            </div>
            <span className={`mt-2 text-xs ${currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Billing</span>
          </div>
          
          {/* Progress line 2-3 */}
          <div className={`flex-1 h-1 mx-4 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          
          {/* Step 3: Payment */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > 3 ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>3</span>
              )}
            </div>
            <span className={`mt-2 text-xs ${currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Payment</span>
          </div>
          
          {/* Progress line 3-4 */}
          <div className={`flex-1 h-1 mx-4 ${currentStep >= 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          
          {/* Step 4: Confirmation */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > 4 ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>4</span>
              )}
            </div>
            <span className={`mt-2 text-xs ${currentStep >= 4 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Confirmation</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>
        
        {/* Checkout progress steps */}
        {!orderPlaced && renderCheckoutProgress()}
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left side: Checkout Steps */}
          <div className={`lg:col-span-2 ${currentStep === 4 ? 'lg:col-span-3' : ''}`}>
            {renderCheckoutStep()}
          </div>
          
          {/* Right side: Order Summary */}
          {currentStep < 4 && (
            <div className="mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="max-h-60 overflow-y-auto mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex py-3 border-b border-gray-100">
                      <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Use appropriate fallback image based on category
                            if (item.category === 'Cables') {
                              e.target.src = datacableImg;
                            } else if (item.category === 'Power') {
                              e.target.src = powerbankImg;
                            } else {
                              e.target.src = chargerImg;
                            }
                          }}
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold text-blue-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mt-4">
                <h3 className="font-medium mb-3 flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Checkout
                </h3>
                <p className="text-sm text-gray-600">
                  Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
