import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Sample products data
  const sampleProducts = [
    {
      id: 1,
      name: 'Premium Type-C Fast Charging Cable',
      category: 'data-cables',
      categoryName: 'Data Cables',
      subcategory: 'Type-C',
      price: 14.99,
      stock: 42,
      image: 'https://images.unsplash.com/photo-1589996448606-27d38c70dd4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      name: 'Micro USB Data Cable 2m',
      category: 'data-cables',
      categoryName: 'Data Cables',
      subcategory: 'Micro',
      price: 9.99,
      stock: 56,
      image: 'https://images.unsplash.com/photo-1583863788434-e62bf5cd4c1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      name: 'Lightning Cable for iOS Devices',
      category: 'data-cables',
      categoryName: 'Data Cables',
      subcategory: 'Lightning',
      price: 19.99,
      stock: 38,
      image: 'https://images.unsplash.com/photo-1609692814859-8cb88f72a3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 4,
      name: 'Wireless Bluetooth Earbuds with Noise Cancellation',
      category: 'earbuds',
      categoryName: 'Earbuds',
      subcategory: 'Wireless',
      price: 89.99,
      stock: 23,
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 5,
      name: 'Fast Charging Type-C Power Adapter',
      category: 'chargers',
      categoryName: 'Chargers',
      subcategory: 'Type-C',
      price: 24.99,
      stock: 67,
      image: 'https://images.unsplash.com/photo-1618478594486-c65b899c4936?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 6,
      name: 'Portable Power Bank 10000mAh',
      category: 'power-banks',
      categoryName: 'Power Banks',
      subcategory: null,
      capacity: '10000mah',
      price: 39.99,
      stock: 18,
      image: 'https://images.unsplash.com/photo-1583863618799-39d4041b2f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 7,
      name: 'Wired Handsfree with Mic',
      category: 'handsfree',
      categoryName: 'Handsfree',
      subcategory: 'Micro',
      price: 12.99,
      stock: 49,
      image: 'https://images.unsplash.com/photo-1540821924489-7690c70c4eac?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 8,
      name: 'Ultra Slim Power Bank 5000mAh',
      category: 'power-banks',
      categoryName: 'Power Banks',
      subcategory: null,
      capacity: '5000mah',
      price: 29.99,
      stock: 32,
      image: 'https://images.unsplash.com/photo-1609592807592-5005a2e94c0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 9,
      name: 'Premium Type-C Handsfree with Noise Cancellation',
      category: 'handsfree',
      categoryName: 'Handsfree',
      subcategory: 'Type-C',
      price: 34.99,
      stock: 5,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 10,
      name: 'High Capacity Power Bank 20000mAh',
      category: 'power-banks',
      categoryName: 'Power Banks',
      subcategory: null,
      capacity: '20000mah',
      price: 59.99,
      stock: 15,
      image: 'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    },
  ];

  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'handsfree', name: 'Handsfree' },
    { id: 'data-cables', name: 'Data Cables' },
    { id: 'power-banks', name: 'Power Banks' },
    { id: 'chargers', name: 'Chargers' },
    { id: 'earbuds', name: 'Earbuds' }
  ];

  // Simulate API call to fetch products
  useEffect(() => {
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 500);
  }, []);

  // Handle product deletion
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In a real app, you'd make an API call to delete the product
      setProducts(products.filter(product => product.id !== id));
    }
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Actions bar */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-secondary-800">Product Management</h2>
          <p className="mt-1 text-sm text-secondary-500">Manage your product listings, add new products, or update existing ones.</p>
        </div>
        
        <Link
          to="/admin/products/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-secondary-700 mb-1">
              Search Products
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-secondary-700 mb-1">
              Filter by Category
            </label>
            <select
              id="category"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-4 sm:p-6 flex justify-center">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                    <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="p-4 sm:p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">ID: #{product.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.categoryName}</div>
                          {product.subcategory && (
                            <div className="text-sm text-gray-500">{product.subcategory}</div>
                          )}
                          {product.capacity && (
                            <div className="text-sm text-gray-500">{product.capacity}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <Link
                              to={`/admin/products/${product.id}`}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
