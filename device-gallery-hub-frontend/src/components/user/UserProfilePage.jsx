import { useState } from 'react';
import { Link } from 'react-router-dom';

// Import the product images used in the wishlist
import earbuds1Img from '../../assets/images/products/earbuds1.jpg';
import earbuds2Img from '../../assets/images/products/earbuds2.jpeg';
import earbuds3Img from '../../assets/images/products/earbuds3.jpg';
import charger1Img from '../../assets/images/products/charger1.jpg';
import charger2Img from '../../assets/images/products/charger2.jpg';
import powerbank1Img from '../../assets/images/products/powerbank1.jpg';
import cable1Img from '../../assets/images/products/cable1.jpg';
import handsfree1Img from '../../assets/images/products/handsfree1.jpg';

// Sample user data - in a real app, this would come from your auth state or API
const sampleUser = {
  id: 1,
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex.johnson@example.com',
  phone: '(555) 123-4567',
  address: {
    street: '123 Main Street',
    city: 'Tech City',
    state: 'CA',
    zipCode: '90210',
    country: 'United States'
  },
  profileImage: null, // No profile image by default
  memberSince: '2022-05-15',
  orderHistory: [
    {
      id: 'ORD-1001',
      date: '2023-05-20',
      total: 149.97,
      status: 'Delivered',
      items: 3
    },
    {
      id: 'ORD-982',
      date: '2023-04-12',
      total: 89.99,
      status: 'Delivered',
      items: 1
    },
    {
      id: 'ORD-867',
      date: '2023-02-28',
      total: 237.45,
      status: 'Delivered',
      items: 4
    }
  ],
  wishlist: [
    {
      id: 201,
      name: 'Premium Wireless Earbuds',
      price: 129.99,
      image: earbuds1Img,
      category: 'audio',
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 202,
      name: '65W GaN Fast Charger',
      price: 39.99,
      image: charger1Img,
      category: 'charging',
      rating: 4.5,
      reviews: 87,
    },
    {
      id: 203,
      name: 'Portable Power Bank 10000mAh',
      price: 49.99,
      image: powerbank1Img,
      category: 'power',
      rating: 4.7,
      reviews: 102,
    },
    {
      id: 204,
      name: 'Braided USB-C Cable 6ft',
      price: 19.99,
      image: cable1Img,
      category: 'cables',
      rating: 4.3,
      reviews: 56,
    },
    {
      id: 205,
      name: 'Noise Cancelling Earbuds Pro',
      price: 149.99,
      image: earbuds2Img,
      category: 'audio',
      rating: 4.9,
      reviews: 78,
    },
    {
      id: 206,
      name: 'Bluetooth Handsfree Earpiece',
      price: 29.99,
      image: handsfree1Img,
      category: 'audio',
      rating: 4.4,
      reviews: 63,
    }
  ],
  paymentMethods: [
    {
      id: 1,
      type: 'Credit Card',
      lastFour: '4567',
      expiryDate: '05/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'PayPal',
      email: 'alex.johnson@example.com',
      isDefault: false
    }
  ],
  notifications: {
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    productRestock: true
  }
};

const UserProfilePage = () => {
  const [user, setUser] = useState(sampleUser);
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    street: user.address.street,
    city: user.address.city,
    state: user.address.state,
    zipCode: user.address.zipCode,
    country: user.address.country
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      }
    });
    setEditMode(false);
  };

  const handleToggleNotification = (setting) => {
    setUser({
      ...user,
      notifications: {
        ...user.notifications,
        [setting]: !user.notifications[setting]
      }
    });
  };

  const handleRemovePaymentMethod = (id) => {
    setUser({
      ...user,
      paymentMethods: user.paymentMethods.filter(method => method.id !== id)
    });
  };

  const handleRemoveFromWishlist = (id) => {
    setUser({
      ...user,
      wishlist: user.wishlist.filter(item => item.id !== id)
    });
  };

  const handleSetDefaultPayment = (id) => {
    setUser({
      ...user,
      paymentMethods: user.paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const renderProfileContent = () => {
    if (editMode) {
      return (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
              <input
                type="text"
                name="street"
                id="street"
                value={formData.street}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State/Province</label>
              <input
                type="text"
                name="state"
                id="state"
                value={formData.state}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP / Postal Code</label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      );
    }

    return (
      <div className="space-y-8">
        {/* Profile Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-semibold">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h3>
              <p className="text-sm text-gray-500">Member since {formatDate(user.memberSince)}</p>
            </div>
          </div>
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Profile
          </button>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h4>
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="mt-1 text-sm text-gray-900">
                  {user.address.street}, {user.address.city}, {user.address.state} {user.address.zipCode}, {user.address.country}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-4">Security</h4>
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-4">Notification Preferences</h4>
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">Order Updates</p>
                  <p className="text-xs text-gray-500">Receive notifications about your order status</p>
                </div>
                <button
                  onClick={() => handleToggleNotification('orderUpdates')}
                  className={`${user.notifications.orderUpdates ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  aria-pressed={user.notifications.orderUpdates}
                >
                  <span className="sr-only">Toggle order updates</span>
                  <span
                    className={`${user.notifications.orderUpdates ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                  ></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">Promotions and Deals</p>
                  <p className="text-xs text-gray-500">Receive notifications about sales and special offers</p>
                </div>
                <button
                  onClick={() => handleToggleNotification('promotions')}
                  className={`${user.notifications.promotions ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  aria-pressed={user.notifications.promotions}
                >
                  <span className="sr-only">Toggle promotions</span>
                  <span
                    className={`${user.notifications.promotions ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                  ></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">Newsletter</p>
                  <p className="text-xs text-gray-500">Receive our weekly newsletter</p>
                </div>
                <button
                  onClick={() => handleToggleNotification('newsletter')}
                  className={`${user.notifications.newsletter ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  aria-pressed={user.notifications.newsletter}
                >
                  <span className="sr-only">Toggle newsletter</span>
                  <span
                    className={`${user.notifications.newsletter ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                  ></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">Product Restock</p>
                  <p className="text-xs text-gray-500">Get notified when out-of-stock items are available</p>
                </div>
                <button
                  onClick={() => handleToggleNotification('productRestock')}
                  className={`${user.notifications.productRestock ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  aria-pressed={user.notifications.productRestock}
                >
                  <span className="sr-only">Toggle product restock</span>
                  <span
                    className={`${user.notifications.productRestock ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrdersContent = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Order History</h3>
      {user.orderHistory.length > 0 ? (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {user.orderHistory.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items} item{order.items !== 1 ? 's' : ''}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Link 
                      to={`/order/${order.id}`} 
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
          <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
          <div className="mt-6">
            <Link
              to="/shop"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Products
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  const renderWishlistContent = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">My Wishlist</h3>
      
      {user.wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.wishlist.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // If image fails, use a default background color and add a text placeholder
                    e.target.style.display = 'none';
                    e.target.parentNode.classList.add('flex', 'items-center', 'justify-center', 'bg-blue-100');
                    const textPlaceholder = document.createElement('span');
                    textPlaceholder.innerText = item.name.charAt(0);
                    textPlaceholder.className = 'text-blue-600 text-4xl font-bold';
                    e.target.parentNode.appendChild(textPlaceholder);
                  }}
                />
                <div className="absolute top-0 right-0 m-2">
                  <button 
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="p-1 bg-white rounded-full shadow hover:bg-red-50 transition-colors" 
                    aria-label="Remove from wishlist"
                  >
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{item.category}</span>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-xs text-gray-600">{item.rating} ({item.reviews})</span>
                  </div>
                </div>
                <h4 className="mt-2 text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                <p className="mt-1 text-lg font-semibold text-blue-600">${item.price.toFixed(2)}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    to={`/product/${item.id}`}
                    className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Your wishlist is empty</h3>
          <p className="mt-1 text-sm text-gray-500">Save items you love to your wishlist.</p>
          <div className="mt-6">
            <Link
              to="/shop"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Products
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  const renderPaymentContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Payment Methods</h3>
        <button
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Payment Method
        </button>
      </div>
      
      {user.paymentMethods.length > 0 ? (
        <div className="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
          {user.paymentMethods.map(method => (
            <div key={method.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                {method.type === 'Credit Card' ? (
                  <div className="bg-blue-500 text-white p-2 rounded-md">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                ) : method.type === 'PayPal' ? (
                  <div className="bg-blue-600 text-white p-2 rounded-md">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  </div>
                ) : null}
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {method.type} {method.lastFour ? `ending in ${method.lastFour}` : ''}
                    {method.isDefault && <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">Default</span>}
                  </p>
                  {method.expiryDate && <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>}
                  {method.email && <p className="text-sm text-gray-500">{method.email}</p>}
                </div>
              </div>
              <div className="flex space-x-3">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefaultPayment(method.id)}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => handleRemovePaymentMethod(method.id)}
                  className="text-sm text-red-600 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No payment methods</h3>
          <p className="mt-1 text-sm text-gray-500">Add a payment method to save for future purchases.</p>
          <div className="mt-6">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Payment Method
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileContent();
      case 'orders':
        return renderOrdersContent();
      case 'wishlist':
        return renderWishlistContent();
      case 'payment':
        return renderPaymentContent();
      default:
        return renderProfileContent();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <nav className="space-y-1 bg-white shadow rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg
                className={`mr-3 h-5 w-5 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'orders'
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg
                className={`mr-3 h-5 w-5 ${activeTab === 'orders' ? 'text-blue-600' : 'text-gray-500'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Orders
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'wishlist'
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg
                className={`mr-3 h-5 w-5 ${activeTab === 'wishlist' ? 'text-blue-600' : 'text-gray-500'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Wishlist
            </button>

            <button
              onClick={() => setActiveTab('payment')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'payment'
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg
                className={`mr-3 h-5 w-5 ${activeTab === 'payment' ? 'text-blue-600' : 'text-gray-500'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Payment Methods
            </button>

            <Link
              to="/"
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg
                className="mr-3 h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white shadow rounded-lg p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
