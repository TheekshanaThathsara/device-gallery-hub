import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

// Import sample product images for wishlist
import cable1Img from '../../assets/images/products/cable1.jpg';
import cable2Img from '../../assets/images/products/cable2.jpg';
import cable3Img from '../../assets/images/products/cable3.jpg';
import earbuds1Img from '../../assets/images/products/earbuds1.jpg';
import earbuds3Img from '../../assets/images/products/earbuds3.jpg';
import earbuds5Img from '../../assets/images/products/earbuds5.jpg';
import powerbank1Img from '../../assets/images/products/powerbank1.jpg';
import powerbank2Img from '../../assets/images/products/powerbank2.jpg';
import powerbank3Img from '../../assets/images/products/powerbank3.jpeg';
import charger1Img from '../../assets/images/products/charger1.jpg';
import charger2Img from '../../assets/images/products/charger2.jpg';
import charger3Img from '../../assets/images/products/charger3.jpeg';
import handsfree1Img from '../../assets/images/products/handsfree1.jpg';
import handsfree2Img from '../../assets/images/products/handsfree2.jpg';
import handsfree3Img from '../../assets/images/products/handsfree3.jpg';

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    profileImage: null
  });
  
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();
  
  // Sample orders data
  const [orders, setOrders] = useState([
    {
      id: 'DGH-123456',
      date: '2025-06-15',
      status: 'Delivered',
      total: 155.97,
      items: [
        { 
          id: 101, 
          name: 'Next Gen Type-C Fast Charging Cable', 
          price: 16.99,
          quantity: 1,
          image: cable1Img
        },
        { 
          id: 103, 
          name: 'Wireless Earbuds Pro Max', 
          price: 89.99,
          quantity: 1,
          image: earbuds1Img
        },
        { 
          id: 105, 
          name: '25000mAh Power Bank with PD', 
          price: 49.99,
          quantity: 1,
          image: powerbank1Img
        }
      ]
    },
    {
      id: 'DGH-123455',
      date: '2025-05-28',
      status: 'Delivered',
      total: 129.98,
      items: [
        { 
          id: 106, 
          name: '65W GaN Fast Charger', 
          price: 39.99,
          quantity: 1,
          image: charger1Img
        },
        { 
          id: 107, 
          name: 'Premium Car Handsfree Kit', 
          price: 89.99,
          quantity: 1,
          image: handsfree1Img
        }
      ]
    }
  ]);
  
  // Sample wishlist data
  const [wishlist, setWishlist] = useState([
    {
      id: 108,
      name: 'MagSafe Wireless Charger Pro',
      price: 44.99,
      oldPrice: 54.99,
      discount: 18,
      image: charger2Img,
      inStock: true
    },
    {
      id: 113,
      name: 'Studio Quality Earbuds Pro',
      price: 129.99,
      oldPrice: 159.99,
      discount: 19,
      image: earbuds3Img,
      inStock: true
    },
    {
      id: 116,
      name: 'Solar Powered 30000mAh Power Bank',
      price: 59.99,
      oldPrice: 79.99,
      discount: 25,
      image: powerbank3Img,
      inStock: false
    },
    {
      id: 120,
      name: 'Premium Business Handsfree Earpiece',
      price: 69.99,
      oldPrice: 89.99,
      discount: 22,
      image: handsfree2Img,
      inStock: true
    },
    {
      id: 102,
      name: 'Braided Lightning Cable Pro',
      price: 14.99,
      oldPrice: 19.99,
      discount: 25,
      image: cable2Img,
      inStock: true
    },
    {
      id: 110,
      name: 'Premium Tangle-Free USB Cable',
      price: 15.99,
      oldPrice: 19.99,
      discount: 20,
      image: cable3Img,
      inStock: true
    },
    {
      id: 109,
      name: '10000mAh Slim Power Bank',
      price: 29.99,
      oldPrice: 39.99,
      discount: 25,
      image: powerbank2Img,
      inStock: true
    },
    {
      id: 118,
      name: 'Compact 120W GaN Charger',
      price: 49.99,
      oldPrice: 69.99,
      discount: 29,
      image: charger3Img,
      inStock: true
    },
    {
      id: 115,
      name: 'Premium Home Audio Earbuds',
      price: 69.99,
      oldPrice: 89.99,
      discount: 22,
      image: earbuds5Img,
      inStock: true
    }
  ]);
  
  // Sample payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'pm-1',
      type: 'visa',
      last4: '4242',
      expiryMonth: '04',
      expiryYear: '2028',
      name: 'John Doe',
      isDefault: true
    },
    {
      id: 'pm-2',
      type: 'mastercard',
      last4: '5555',
      expiryMonth: '08',
      expiryYear: '2026',
      name: 'John Doe',
      isDefault: false
    }
  ]);
  
  // Function to handle file input change for profile picture
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Function to handle removing item from wishlist with animation
  const handleRemoveFromWishlist = (itemId) => {
    // Add a removing class to the item for fade-out animation
    const itemToRemove = document.querySelector(`[data-wishlist-id="${itemId}"]`);
    if (itemToRemove) {
      itemToRemove.classList.add('opacity-0', 'scale-95');
      itemToRemove.style.transition = 'all 0.3s ease-out';
      
      // Remove the item after animation completes
      setTimeout(() => {
        setWishlist(prev => prev.filter(item => item.id !== itemId));
      }, 300);
    } else {
      // Fallback if item element not found
      setWishlist(prev => prev.filter(item => item.id !== itemId));
    }
  };
  
  // Function to make payment method default
  const handleMakeDefaultPayment = (methodId) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    );
  };
  
  // Function to remove payment method
  const handleRemovePayment = (methodId) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
  };
  
  // Function to handle adding wishlist item to cart
  const handleAddToCart = (item) => {
    // Add item to cart
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      discount: item.discount
    });
    
    // Show success message
    alert(`${item.name} added to cart!`);
  };
  
  const getCardIcon = (cardType) => {
    switch (cardType.toLowerCase()) {
      case 'visa':
        return (
          <div className="bg-blue-50 text-blue-700 font-bold p-1 rounded text-xs flex items-center justify-center">
            VISA
          </div>
        );
      case 'mastercard':
        return (
          <div className="bg-red-50 text-red-700 font-bold p-1 rounded text-xs flex items-center justify-center">
            MC
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 text-gray-700 p-1 rounded text-xs flex items-center justify-center">
            CARD
          </div>
        );
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="bg-secondary-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 text-sm font-medium rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-50"
            aria-label="Go back"
          >
            <svg className="w-4 h-4 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary-800">My Account</h1>
          <div className="w-24"></div> {/* This empty div helps center the heading */}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {/* User Info */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-md">
                      {userData.profileImage ? (
                        <img 
                          src={userData.profileImage} 
                          alt="Profile" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-secondary-100">
                          <span className="text-2xl font-semibold text-secondary-600">
                            {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <label
                      htmlFor="profile-image"
                      className="absolute bottom-0 right-0 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-1 cursor-pointer shadow-md"
                      title="Change profile picture"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </label>
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileImageChange}
                    />
                  </div>
                  
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-secondary-800">
                      {userData.firstName} {userData.lastName}
                    </h2>
                    <p className="text-sm text-secondary-500">{userData.email}</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === 'profile'
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Personal Information
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === 'orders'
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Order History
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('wishlist')}
                      className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === 'wishlist'
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Wishlist
                      {wishlist.length > 0 && (
                        <span className="ml-auto inline-flex items-center justify-center h-5 w-5 bg-primary-100 text-primary-700 text-xs rounded-full">
                          {wishlist.length}
                        </span>
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('payment')}
                      className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === 'payment'
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Payment Methods
                    </button>
                  </li>
                  <li className="pt-2 mt-2 border-t border-gray-100">
                    <button
                      className="w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      onClick={() => alert('You have been logged out')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:flex-1">
            {/* Profile Information Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-medium text-secondary-800 mb-6">Personal Information</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 shadow-sm p-2.5 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-secondary-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 shadow-sm p-2.5 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 shadow-sm p-2.5 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 shadow-sm p-2.5 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-secondary-800 mb-3">Address Information</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="street" className="block text-sm font-medium text-secondary-700 mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="address.street"
                          value={userData.address.street}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 shadow-sm p-2.5 text-sm"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-secondary-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="address.city"
                            value={userData.address.city}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 shadow-sm p-2.5 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-secondary-700 mb-1">
                            State / Province
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="address.state"
                            value={userData.address.state}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 shadow-sm p-2.5 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-secondary-700 mb-1">
                            ZIP / Postal Code
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="address.zipCode"
                            value={userData.address.zipCode}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 shadow-sm p-2.5 text-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-secondary-700 mb-1">
                          Country
                        </label>
                        <select
                          id="country"
                          name="address.country"
                          value={userData.address.country}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 shadow-sm p-2.5 text-sm"
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
                  
                  <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => alert('Profile Updated!')}
                      className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Order History Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="text-xl font-medium text-secondary-800 p-6 border-b border-gray-100">Order History</h2>
                
                {orders.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 text-secondary-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <h3 className="mt-2 text-base font-medium text-secondary-800">No orders yet</h3>
                    <p className="mt-1 text-sm text-secondary-500">When you make your first purchase, it will appear here.</p>
                    <div className="mt-6">
                      <Link
                        to="/shop"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                      >
                        Browse Products
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {orders.map(order => (
                      <div key={order.id} className="p-6">
                        <div className="flex flex-wrap items-center justify-between mb-4">
                          <div className="mb-2 sm:mb-0">
                            <h3 className="text-base font-medium text-secondary-800">
                              Order #{order.id}
                            </h3>
                            <p className="text-sm text-secondary-500">{formatDate(order.date)}</p>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'Processing'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                            
                            <Link
                              to={`/orders/${order.id}`}
                              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                          {order.items.map(item => (
                            <div key={item.id} className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                                <img 
                                  src={typeof item.image === 'string' ? item.image : item.image.src || item.image} 
                                  alt={item.name} 
                                  className="h-full w-full object-cover object-center"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                                  }}
                                />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <Link 
                                  to={`/product/${item.id}`}
                                  className="text-sm font-medium text-secondary-800 hover:text-primary-600 truncate block"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-xs text-secondary-500 mt-1">
                                  Qty: {item.quantity} | ${item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
                          <div className="text-sm text-secondary-500">
                            {order.items.reduce((total, item) => total + item.quantity, 0)} items
                          </div>
                          
                          <div className="text-base font-medium text-secondary-800">
                            Total: ${order.total.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="text-xl font-medium text-secondary-800 p-6 border-b border-gray-100">My Wishlist</h2>
                
                {wishlist.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 text-secondary-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="mt-2 text-base font-medium text-secondary-800">Your wishlist is empty</h3>
                    <p className="mt-1 text-sm text-secondary-500">Save items you're interested in by clicking the heart icon on product pages.</p>
                    <div className="mt-6">
                      <Link
                        to="/shop"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                      >
                        Browse Products
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map(item => (
                        <div 
                          key={item.id} 
                          data-wishlist-id={item.id}
                          className="relative group bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                          <div className="relative h-48 overflow-hidden rounded-t-lg bg-gray-100">
                            <img 
                              src={typeof item.image === 'string' ? item.image : item.image.src || item.image} 
                              alt={item.name} 
                              className="w-full h-full object-contain object-center p-2"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                              }}
                            />
                            {item.discount > 0 && (
                              <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold py-1 px-2 rounded-md shadow-sm">
                                -{item.discount}%
                              </div>
                            )}
                            {!item.inStock && (
                              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-filter backdrop-blur-sm">
                                <span className="text-white font-medium px-3 py-1 bg-black bg-opacity-50 rounded-md">Out of Stock</span>
                              </div>
                            )}
                            <Link 
                              to={`/product/${item.id}`} 
                              className="absolute inset-0 z-10" 
                              aria-label={`View details of ${item.name}`}
                            ></Link>
                          </div>
                          
                          <div className="p-4">
                            <Link 
                              to={`/product/${item.id}`}
                              className="text-secondary-800 hover:text-primary-600 text-sm font-medium line-clamp-2 block h-10"
                            >
                              {item.name}
                            </Link>
                            
                            <div className="flex items-center mt-2">
                              <span className="text-secondary-800 font-semibold">${item.price.toFixed(2)}</span>
                              {item.oldPrice && (
                                <span className="ml-2 text-secondary-400 text-xs line-through">${item.oldPrice.toFixed(2)}</span>
                              )}
                            </div>
                            
                            <div className="mt-4 flex space-x-2">
                              <button
                                disabled={!item.inStock}
                                className={`flex-1 py-2 px-3 text-xs font-medium rounded-md shadow-sm transition-colors ${
                                  item.inStock
                                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                                onClick={() => item.inStock && handleAddToCart(item)}
                              >
                                {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                              </button>
                              
                              <button
                                onClick={() => handleRemoveFromWishlist(item.id)}
                                className="py-2 px-3 text-xs font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
                                aria-label={`Remove ${item.name} from wishlist`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="text-xl font-medium text-secondary-800 p-6 border-b border-gray-100">Payment Methods</h2>
                
                {paymentMethods.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 text-secondary-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h3 className="mt-2 text-base font-medium text-secondary-800">No payment methods saved</h3>
                    <p className="mt-1 text-sm text-secondary-500">Add a payment method to make checkout faster.</p>
                    <div className="mt-6">
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                        onClick={() => alert('Add payment method dialog would open here')}
                      >
                        Add Payment Method
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="mb-6 flex justify-end">
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100"
                        onClick={() => alert('Add payment method dialog would open here')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Card
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {paymentMethods.map(method => (
                        <div 
                          key={method.id} 
                          className={`p-4 rounded-lg border ${
                            method.isDefault ? 'border-primary-300 bg-primary-50' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-12 flex justify-center items-center">
                                {getCardIcon(method.type)}
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-secondary-800">
                                  •••• •••• •••• {method.last4}
                                </p>
                                <p className="text-xs text-secondary-500">
                                  Expires {method.expiryMonth}/{method.expiryYear}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              {method.isDefault ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                  Default
                                </span>
                              ) : (
                                <button 
                                  className="text-xs text-primary-600 hover:text-primary-800"
                                  onClick={() => handleMakeDefaultPayment(method.id)}
                                >
                                  Make Default
                                </button>
                              )}
                              
                              <button
                                className="text-xs text-red-600 hover:text-red-800"
                                onClick={() => handleRemovePayment(method.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
