import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditMode = productId !== 'new';
  
  // Form fields state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    oldPrice: '',
    discount: 0,
    stock: '',
    description: '',
    features: [''],
    specifications: {},
    images: [''],
    capacity: ''
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  // Categories and subcategories for dropdown options
  const categories = [
    { id: 'handsfree', name: 'Handsfree' },
    { id: 'data-cables', name: 'Data Cables' },
    { id: 'power-banks', name: 'Power Banks' },
    { id: 'chargers', name: 'Chargers' },
    { id: 'earbuds', name: 'Earbuds' }
  ];
  
  const subcategories = {
    'handsfree': [
      { id: 'micro', name: 'Micro' },
      { id: 'type-c', name: 'Type-C' }
    ],
    'data-cables': [
      { id: 'micro', name: 'Micro' },
      { id: 'type-c', name: 'Type-C' },
      { id: 'lightning', name: 'Lightning' }
    ],
    'chargers': [
      { id: 'type-c', name: 'Type-C' },
      { id: 'wireless', name: 'Wireless' }
    ],
    'earbuds': [
      { id: 'wireless', name: 'Wireless' },
      { id: 'wired', name: 'Wired' }
    ]
  };
  
  const powerBankCapacities = [
    { id: '5000mah', name: '5000mAh' },
    { id: '10000mah', name: '10000mAh' },
    { id: '20000mah', name: '20000mAh' }
  ];

  // Fetch product data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      // In a real app, you'd fetch the product from an API
      setLoading(true);
      
      // Simulate API fetch
      setTimeout(() => {
        // Sample product data
        const mockProduct = {
          id: productId,
          name: 'Premium Type-C Fast Charging Cable',
          category: 'data-cables',
          categoryName: 'Data Cables',
          subcategory: 'Type-C',
          price: 14.99,
          oldPrice: 19.99,
          discount: 25,
          stock: 42,
          description: 'High-quality Type-C cable for fast data transfer and charging. Compatible with all Type-C devices.',
          features: [
            'Fast charging up to 100W',
            'Data transfer speeds up to 480 Mbps',
            'Durable braided nylon construction',
            'Compatible with all USB Type-C devices'
          ],
          specifications: {
            'Length': '1.5m',
            'Material': 'Braided Nylon',
            'Connector Type': 'USB Type-C',
            'Output': '5V/3A, 9V/2A, 12V/1.5A',
            'Data Transfer Speed': '480 Mbps'
          },
          images: [
            'https://images.unsplash.com/photo-1589996448606-27d38c70dd4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1583863788434-e62bf5cd4c1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1609692814859-8cb88f72a3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
          ]
        };
        
        setFormData(mockProduct);
        setLoading(false);
      }, 500);
    }
  }, [productId, isEditMode]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'price' || name === 'oldPrice' || name === 'stock' || name === 'discount') {
      // Convert to number and handle invalid inputs
      const numValue = value === '' ? '' : parseFloat(value);
      setFormData({ ...formData, [name]: numValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    setIsDirty(true);
  };
  
  // Handle feature input changes
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
    setIsDirty(true);
  };
  
  // Add new feature field
  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };
  
  // Remove feature field
  const removeFeature = (index) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
    setIsDirty(true);
  };
  
  // Handle image URL changes
  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
    setIsDirty(true);
  };
  
  // Add new image field
  const addImage = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };
  
  // Remove image field
  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
    setIsDirty(true);
  };
  
  // Add new specification
  const addSpecification = () => {
    if (newSpecKey && newSpecValue) {
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [newSpecKey]: newSpecValue
        }
      });
      setNewSpecKey('');
      setNewSpecValue('');
      setIsDirty(true);
    }
  };
  
  // Remove specification
  const removeSpecification = (key) => {
    const newSpecs = { ...formData.specifications };
    delete newSpecs[key];
    setFormData({ ...formData, specifications: newSpecs });
    setIsDirty(true);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Form validation
      if (!formData.name || !formData.category || !formData.price || formData.price <= 0 || !formData.stock || formData.stock < 0) {
        setError('Please fill in all required fields correctly.');
        return;
      }
      
      // In a real app, you'd send the data to an API
      console.log('Submitting product data:', formData);
      
      // Show success message and navigate back to products list
      alert(`Product ${isEditMode ? 'updated' : 'created'} successfully!`);
      navigate('/admin/products');
      
    } catch (err) {
      setError('An error occurred while saving the product.');
    }
  };
  
  // Handle cancellation
  const handleCancel = () => {
    if (isDirty && !window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
      return;
    }
    navigate('/admin/products');
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-secondary-800">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h2>
          <p className="mt-1 text-sm text-secondary-500">
            {isEditMode ? 'Update the product details below.' : 'Fill out the form below to add a new product.'}
          </p>
        </div>
      </div>
      
      {loading ? (
        <div className="bg-white shadow rounded-lg p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Product Name */}
            <div className="sm:col-span-6">
              <label htmlFor="name" className="block text-sm font-medium text-secondary-700">
                Product Name <span className="text-red-600">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            {/* Category */}
            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium text-secondary-700">
                Category <span className="text-red-600">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Subcategory */}
            <div className="sm:col-span-3">
              <label htmlFor="subcategory" className="block text-sm font-medium text-secondary-700">
                Subcategory
              </label>
              <div className="mt-1">
                <select
                  id="subcategory"
                  name="subcategory"
                  value={formData.subcategory || ''}
                  onChange={handleInputChange}
                  disabled={!formData.category || !subcategories[formData.category]}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select Subcategory</option>
                  {formData.category && subcategories[formData.category] && subcategories[formData.category].map((subcat) => (
                    <option key={subcat.id} value={subcat.id}>
                      {subcat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Power Bank Capacity (conditional) */}
            {formData.category === 'power-banks' && (
              <div className="sm:col-span-3">
                <label htmlFor="capacity" className="block text-sm font-medium text-secondary-700">
                  Capacity
                </label>
                <div className="mt-1">
                  <select
                    id="capacity"
                    name="capacity"
                    value={formData.capacity || ''}
                    onChange={handleInputChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Select Capacity</option>
                    {powerBankCapacities.map((capacity) => (
                      <option key={capacity.id} value={capacity.id}>
                        {capacity.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            
            {/* Price */}
            <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium text-secondary-700">
                Price <span className="text-red-600">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            {/* Old Price */}
            <div className="sm:col-span-2">
              <label htmlFor="oldPrice" className="block text-sm font-medium text-secondary-700">
                Old Price (Optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="oldPrice"
                  id="oldPrice"
                  min="0"
                  step="0.01"
                  value={formData.oldPrice || ''}
                  onChange={handleInputChange}
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            {/* Discount */}
            <div className="sm:col-span-2">
              <label htmlFor="discount" className="block text-sm font-medium text-secondary-700">
                Discount % (Optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  min="0"
                  max="100"
                  value={formData.discount || 0}
                  onChange={handleInputChange}
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
            
            {/* Stock */}
            <div className="sm:col-span-2">
              <label htmlFor="stock" className="block text-sm font-medium text-secondary-700">
                Stock <span className="text-red-600">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            {/* Description */}
            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-secondary-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            {/* Features */}
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Features
              </label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex mb-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder={`Feature ${index + 1}`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Feature
              </button>
            </div>
            
            {/* Specifications */}
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Specifications
              </label>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      value={newSpecKey}
                      onChange={(e) => setNewSpecKey(e.target.value)}
                      placeholder="Specification Name"
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex">
                    <div className="flex-grow">
                      <input
                        type="text"
                        value={newSpecValue}
                        onChange={(e) => setNewSpecValue(e.target.value)}
                        placeholder="Specification Value"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addSpecification}
                      disabled={!newSpecKey || !newSpecValue}
                      className="ml-2 inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {Object.keys(formData.specifications).length > 0 && (
                <div className="mt-4 border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Specification
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(formData.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {key}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {value}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              type="button"
                              onClick={() => removeSpecification(key)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {/* Images */}
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Product Images
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex flex-col space-y-2">
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={image}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          placeholder="Image URL"
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      {image && (
                        <div className="h-32 bg-gray-200 rounded-md overflow-hidden">
                          <img 
                            src={image} 
                            alt={`Product preview ${index + 1}`} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="inline-flex items-center justify-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="bg-gray-50 p-3 rounded-md flex items-center justify-center">
                  <button
                    type="button"
                    onClick={addImage}
                    className="inline-flex items-center px-4 py-4 border-2 border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    Add Image
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {isEditMode ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
