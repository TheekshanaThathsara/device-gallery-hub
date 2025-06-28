import { useState } from 'react';

export default function PaymentForm({ initialValues, shippingAddress, onSubmit, onBack }) {
  const [formData, setFormData] = useState(initialValues || {
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
    }
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // Handle billing address same as shipping toggle
  const handleSameAsShipping = (e) => {
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      billingAddress: {
        ...prev.billingAddress,
        sameAsShipping: checked,
        ...(checked ? {
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zipCode: shippingAddress.zipCode,
          country: shippingAddress.country
        } : {})
      }
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
    
    // Validate on change if field has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      billingAddress: {
        ...prev.billingAddress,
        [name]: value
      }
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

  const formatCardNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Format with spaces every 4 digits
    const parts = [];
    for (let i = 0; i < digits.length && i < 16; i += 4) {
      parts.push(digits.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const formatExpDate = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    if (digits.length > 2) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    }
    return digits;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        cardNumber: formatted
      }
    }));
    
    if (touched.cardNumber) {
      validateField('cardNumber', formatted);
    }
  };

  const handleExpDateChange = (e) => {
    const formatted = formatExpDate(e.target.value);
    setFormData(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        expDate: formatted
      }
    }));
    
    if (touched.expDate) {
      validateField('expDate', formatted);
    }
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    
    switch (name) {
      case 'cardNumber':
        if (!value.trim()) {
          newErrors.cardNumber = 'Card number is required';
        } else if (value.replace(/\s/g, '').length < 15) {
          newErrors.cardNumber = 'Please enter a valid card number';
        } else {
          delete newErrors.cardNumber;
        }
        break;
      case 'nameOnCard':
        if (!value.trim()) {
          newErrors.nameOnCard = 'Name on card is required';
        } else {
          delete newErrors.nameOnCard;
        }
        break;
      case 'expDate':
        if (!value.trim()) {
          newErrors.expDate = 'Expiration date is required';
        } else if (!/^\d{2}\/\d{2}$/.test(value)) {
          newErrors.expDate = 'Please enter a valid expiration date (MM/YY)';
        } else {
          // Check if card is expired
          const [month, year] = value.split('/');
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear() % 100;  // Get last two digits of year
          const currentMonth = currentDate.getMonth() + 1;  // getMonth() is zero-indexed
          
          if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            newErrors.expDate = 'Card has expired';
          } else if (parseInt(month) < 1 || parseInt(month) > 12) {
            newErrors.expDate = 'Invalid month';
          } else {
            delete newErrors.expDate;
          }
        }
        break;
      case 'cvv':
        if (!value.trim()) {
          newErrors.cvv = 'CVV is required';
        } else if (!/^\d{3,4}$/.test(value)) {
          newErrors.cvv = 'CVV must be 3 or 4 digits';
        } else {
          delete newErrors.cvv;
        }
        break;
      default:
        // For billing address fields when sameAsShipping is false
        if (!formData.billingAddress.sameAsShipping) {
          const billingFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode'];
          if (billingFields.includes(name) && !value.trim()) {
            newErrors[name] = 'This field is required';
          } else {
            delete newErrors[name];
          }
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    const newTouched = {};
    
    // Payment validation
    const paymentFields = ['cardNumber', 'nameOnCard', 'expDate', 'cvv'];
    paymentFields.forEach(field => {
      newTouched[field] = true;
      
      if (!formData.payment[field]) {
        newErrors[field] = `${field === 'cvv' ? 'CVV' : field.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + field.replace(/([A-Z])/g, ' $1').slice(1)} is required`;
      }
    });
    
    // Card number validation
    if (formData.payment.cardNumber && formData.payment.cardNumber.replace(/\s/g, '').length < 15) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    
    // Expiration date validation
    if (formData.payment.expDate) {
      if (!/^\d{2}\/\d{2}$/.test(formData.payment.expDate)) {
        newErrors.expDate = 'Please enter a valid expiration date (MM/YY)';
      } else {
        // Check if card is expired
        const [month, year] = formData.payment.expDate.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;  // Get last two digits of year
        const currentMonth = currentDate.getMonth() + 1;  // getMonth() is zero-indexed
        
        if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
          newErrors.expDate = 'Card has expired';
        } else if (parseInt(month) < 1 || parseInt(month) > 12) {
          newErrors.expDate = 'Invalid month';
        }
      }
    }
    
    // CVV validation
    if (formData.payment.cvv && !/^\d{3,4}$/.test(formData.payment.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    // Billing address validation (if not same as shipping)
    if (!formData.billingAddress.sameAsShipping) {
      const billingFields = [
        { name: 'firstName', label: 'First name' },
        { name: 'lastName', label: 'Last name' },
        { name: 'address', label: 'Address' },
        { name: 'city', label: 'City' },
        { name: 'state', label: 'State' },
        { name: 'zipCode', label: 'ZIP code' }
      ];
      
      billingFields.forEach(field => {
        newTouched[field.name] = true;
        if (!formData.billingAddress[field.name]) {
          newErrors[field.name] = `${field.label} is required`;
        }
      });
    }
    
    setTouched(newTouched);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-secondary-800 mb-6">Payment Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method */}
        <div>
          <h3 className="text-base font-medium text-secondary-800 mb-3">Payment Method</h3>
          
          <div className="bg-secondary-50 p-4 rounded-md mb-4">
            <p className="text-sm text-secondary-600">
              <span className="font-medium">Secure Payment:</span> All transactions are secured with SSL encryption
            </p>
          </div>
          
          {/* Card Details */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-secondary-700 mb-1">
                Card Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.payment.cardNumber}
                  onChange={handleCardNumberChange}
                  onBlur={handleBlur}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={`w-full rounded-md border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} p-2.5 pl-10 text-sm shadow-sm`}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-secondary-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
              {errors.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>}
            </div>
            
            <div>
              <label htmlFor="nameOnCard" className="block text-sm font-medium text-secondary-700 mb-1">
                Name on Card <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                value={formData.payment.nameOnCard}
                onChange={handlePaymentChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                className={`w-full rounded-md border ${errors.nameOnCard ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm`}
              />
              {errors.nameOnCard && <p className="mt-1 text-xs text-red-500">{errors.nameOnCard}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="expDate" className="block text-sm font-medium text-secondary-700 mb-1">
                  Expiration Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="expDate"
                  name="expDate"
                  value={formData.payment.expDate}
                  onChange={handleExpDateChange}
                  onBlur={handleBlur}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={`w-full rounded-md border ${errors.expDate ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm`}
                />
                {errors.expDate && <p className="mt-1 text-xs text-red-500">{errors.expDate}</p>}
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-secondary-700 mb-1">
                  CVV <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.payment.cvv}
                    onChange={handlePaymentChange}
                    onBlur={handleBlur}
                    placeholder="123"
                    maxLength={4}
                    className={`w-full rounded-md border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-tooltip-target="cvv-tooltip">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div id="cvv-tooltip" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                      3-4 digit code on the back of your card
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </div>
                {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>}
              </div>
            </div>
            
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="savePaymentInfo"
                name="savePaymentInfo"
                checked={formData.payment.savePaymentInfo}
                onChange={handlePaymentChange}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="savePaymentInfo" className="ml-2 block text-sm text-secondary-700">
                Save this payment method for future purchases
              </label>
            </div>
          </div>
        </div>
        
        {/* Billing Address */}
        <div>
          <h3 className="text-base font-medium text-secondary-800 mb-3">Billing Address</h3>
          
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="sameAsShipping"
              name="sameAsShipping"
              checked={formData.billingAddress.sameAsShipping}
              onChange={handleSameAsShipping}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="sameAsShipping" className="ml-2 block text-sm text-secondary-700">
              Same as shipping address
            </label>
          </div>
          
          {/* Show billing address form if not same as shipping */}
          {!formData.billingAddress.sameAsShipping && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.billingAddress.firstName}
                    onChange={handleBillingChange}
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
                    value={formData.billingAddress.lastName}
                    onChange={handleBillingChange}
                    onBlur={handleBlur}
                    className={`w-full rounded-md border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm`}
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-secondary-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.billingAddress.address}
                  onChange={handleBillingChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-md border ${errors.address ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm`}
                />
                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-secondary-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.billingAddress.city}
                    onChange={handleBillingChange}
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
                    value={formData.billingAddress.state}
                    onChange={handleBillingChange}
                    onBlur={handleBlur}
                    className={`w-full rounded-md border ${errors.state ? 'border-red-500' : 'border-gray-300'} p-2.5 text-sm shadow-sm`}
                  />
                  {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-secondary-700 mb-1">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.billingAddress.zipCode}
                    onChange={handleBillingChange}
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
                    value={formData.billingAddress.country}
                    onChange={handleBillingChange}
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
          )}
        </div>
        
        {/* Form Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-sm text-secondary-600 hover:text-secondary-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Return to Shipping
          </button>
          
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-md font-medium transition-colors"
          >
            Review Order
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
