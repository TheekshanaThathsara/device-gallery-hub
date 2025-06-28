import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ShippingForm({ initialValues, shippingMethod, onSubmit }) {
  const [formData, setFormData] = useState(initialValues || {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });

  const [selectedShipping, setSelectedShipping] = useState(
    shippingMethod?.type || 'standard'
  );

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate on change if field has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          newErrors[name] = 'This field is required';
        } else {
          delete newErrors[name];
        }
        break;
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'address':
        if (!value.trim()) {
          newErrors.address = 'Address is required';
        } else {
          delete newErrors.address;
        }
        break;
      case 'city':
        if (!value.trim()) {
          newErrors.city = 'City is required';
        } else {
          delete newErrors.city;
        }
        break;
      case 'state':
        if (!value.trim()) {
          newErrors.state = 'State is required';
        } else {
          delete newErrors.state;
        }
        break;
      case 'zipCode':
        if (!value.trim()) {
          newErrors.zipCode = 'ZIP Code is required';
        } else if (!/^\d{5}(-\d{4})?$/.test(value)) {
          newErrors.zipCode = 'Please enter a valid ZIP Code';
        } else {
          delete newErrors.zipCode;
        }
        break;
      case 'phone':
        if (value && !/^\d{10}$|^\d{3}-\d{3}-\d{4}$/.test(value.replace(/\s/g, ''))) {
          newErrors.phone = 'Please enter a valid 10-digit phone number';
        } else {
          delete newErrors.phone;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    let newErrors = {};
    let newTouched = {};
    
    requiredFields.forEach(field => {
      newTouched[field] = true;
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // ZIP Code validation
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP Code';
    }
    
    // Phone validation (if provided)
    if (formData.phone && !/^\d{10}$|^\d{3}-\d{3}-\d{4}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setTouched(newTouched);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({ 
        shipping: formData, 
        shippingMethod: { 
          type: selectedShipping,
          price: selectedShipping === 'express' ? 9.99 : (selectedShipping === 'standard' ? 5.99 : 0)
        } 
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-secondary-800 mb-6">Shipping Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div>
          <h3 className="text-base font-medium text-secondary-800 mb-3">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-md border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm`}
              />
              {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-secondary-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-md border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm`}
              />
              {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
          
          <div className="mt-4">
            <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Example: 555-123-4567"
              className={`w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm`}
            />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>
        </div>
        
        {/* Shipping Address */}
        <div>
          <h3 className="text-base font-medium text-secondary-800 mb-3">Shipping Address</h3>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-secondary-700 mb-1">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full rounded-md border ${errors.address ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm`}
            />
            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-secondary-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-md border ${errors.city ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm`}
              />
              {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
            </div>
            
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-secondary-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-md border ${errors.state ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm`}
              />
              {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-secondary-700 mb-1">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-md border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm`}
              />
              {errors.zipCode && <p className="mt-1 text-xs text-red-500">{errors.zipCode}</p>}
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-secondary-700 mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-md border border-gray-300 p-2.5 text-sm shadow-sm"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                {/* Add more countries as needed */}
              </select>
            </div>
          </div>
        </div>
        
        {/* Shipping Methods */}
        <div>
          <h3 className="text-base font-medium text-secondary-800 mb-3">Shipping Method</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Standard Shipping */}
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedShipping === 'standard' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200'
              }`}
              onClick={() => setSelectedShipping('standard')}
            >
              <div className="flex items-start">
                <input
                  type="radio"
                  id="standard"
                  name="shippingMethod"
                  checked={selectedShipping === 'standard'}
                  onChange={() => setSelectedShipping('standard')}
                  className="mt-1.5"
                />
                <div className="ml-3">
                  <label htmlFor="standard" className="block font-medium text-secondary-800">Standard Shipping</label>
                  <p className="text-sm text-secondary-500">Delivery in 5-7 business days</p>
                  <p className="text-sm font-medium text-secondary-800 mt-1">
                    {formData.country === 'United States' ? (
                      <>Free for orders over $50 <span className="text-xs">($5.99 otherwise)</span></>
                    ) : (
                      "$9.99"
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Express Shipping */}
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedShipping === 'express' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200'
              }`}
              onClick={() => setSelectedShipping('express')}
            >
              <div className="flex items-start">
                <input
                  type="radio"
                  id="express"
                  name="shippingMethod"
                  checked={selectedShipping === 'express'}
                  onChange={() => setSelectedShipping('express')}
                  className="mt-1.5"
                />
                <div className="ml-3">
                  <label htmlFor="express" className="block font-medium text-secondary-800">Express Shipping</label>
                  <p className="text-sm text-secondary-500">Delivery in 1-3 business days</p>
                  <p className="text-sm font-medium text-secondary-800 mt-1">$9.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <Link 
            to="/cart" 
            className="flex items-center text-sm text-secondary-600 hover:text-secondary-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Return to Cart
          </Link>
          
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-md font-medium transition-colors"
          >
            Continue to Payment
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
