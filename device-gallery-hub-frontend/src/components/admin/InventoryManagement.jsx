import { useState, useEffect } from 'react';

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  
  // Categories for filter dropdown options
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'handsfree', name: 'Handsfree' },
    { id: 'data-cables', name: 'Data Cables' },
    { id: 'power-banks', name: 'Power Banks' },
    { id: 'chargers', name: 'Chargers' },
    { id: 'earbuds', name: 'Earbuds' }
  ];
  
  // Stock filter options
  const stockFilterOptions = [
    { id: 'all', name: 'All Stock' },
    { id: 'low', name: 'Low Stock (≤ 10)' },
    { id: 'out', name: 'Out of Stock' },
    { id: 'in', name: 'In Stock (> 10)' }
  ];
  
  // Sample inventory data
  const sampleInventory = [
    { 
      id: 1, 
      productId: 'PRD-1001', 
      name: 'Premium Type-C Fast Charging Cable', 
      category: 'data-cables',
      sku: 'CABLE-TC-001',
      stock: 42, 
      minStockLevel: 15,
      reorderQuantity: 30,
      lastUpdated: '2023-09-01',
      location: 'Warehouse A - Shelf 3'
    },
    { 
      id: 2, 
      productId: 'PRD-1002', 
      name: 'Micro USB Data Cable 2m', 
      category: 'data-cables',
      sku: 'CABLE-MU-002',
      stock: 28, 
      minStockLevel: 10,
      reorderQuantity: 25,
      lastUpdated: '2023-09-02',
      location: 'Warehouse A - Shelf 3'
    },
    { 
      id: 3, 
      productId: 'PRD-1003', 
      name: 'Wireless Earbuds Pro', 
      category: 'earbuds',
      sku: 'EAR-WL-001',
      stock: 5, 
      minStockLevel: 8,
      reorderQuantity: 15,
      lastUpdated: '2023-09-01',
      location: 'Warehouse B - Secure Cabinet 2'
    },
    { 
      id: 4, 
      productId: 'PRD-1004', 
      name: 'Premium Type-C Handsfree', 
      category: 'handsfree',
      sku: 'HF-TC-001',
      stock: 0, 
      minStockLevel: 10,
      reorderQuantity: 20,
      lastUpdated: '2023-08-28',
      location: 'Warehouse A - Shelf 5'
    },
    { 
      id: 5, 
      productId: 'PRD-1005', 
      name: '10000mAh Power Bank', 
      category: 'power-banks',
      sku: 'PB-10K-001',
      stock: 18, 
      minStockLevel: 10,
      reorderQuantity: 15,
      lastUpdated: '2023-09-03',
      location: 'Warehouse B - Shelf 1'
    },
    { 
      id: 6, 
      productId: 'PRD-1006', 
      name: 'Wireless Charger Pad', 
      category: 'chargers',
      sku: 'CHRG-WL-001',
      stock: 12, 
      minStockLevel: 8,
      reorderQuantity: 12,
      lastUpdated: '2023-09-02',
      location: 'Warehouse A - Shelf 4'
    },
    { 
      id: 7, 
      productId: 'PRD-1007', 
      name: 'Fast Wall Charger', 
      category: 'chargers',
      sku: 'CHRG-WALL-001',
      stock: 35, 
      minStockLevel: 15,
      reorderQuantity: 25,
      lastUpdated: '2023-09-01',
      location: 'Warehouse A - Shelf 4'
    },
    { 
      id: 8, 
      productId: 'PRD-1008', 
      name: 'Type-C to HDMI Adapter', 
      category: 'data-cables',
      sku: 'ADPT-HDMI-001',
      stock: 8, 
      minStockLevel: 5,
      reorderQuantity: 10,
      lastUpdated: '2023-09-03',
      location: 'Warehouse B - Shelf 2'
    },
    { 
      id: 9, 
      productId: 'PRD-1009', 
      name: 'Micro USB Handsfree', 
      category: 'handsfree',
      sku: 'HF-MU-001',
      stock: 23, 
      minStockLevel: 10,
      reorderQuantity: 15,
      lastUpdated: '2023-09-02',
      location: 'Warehouse A - Shelf 5'
    },
    { 
      id: 10, 
      productId: 'PRD-1010', 
      name: '20000mAh Power Bank', 
      category: 'power-banks',
      sku: 'PB-20K-001',
      stock: 7, 
      minStockLevel: 5,
      reorderQuantity: 10,
      lastUpdated: '2023-09-01',
      location: 'Warehouse B - Shelf 1'
    }
  ];

  // Simulate API call to fetch inventory data
  useEffect(() => {
    setTimeout(() => {
      setInventory(sampleInventory);
      setLoading(false);
    }, 500);
  }, []);
  
  // Sort function
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Update stock level
  const handleStockUpdate = (id, newValue) => {
    // Validate input
    if (newValue === '' || isNaN(newValue) || parseInt(newValue) < 0) {
      alert('Please enter a valid stock quantity (0 or higher)');
      return;
    }
    
    // Update stock in state
    setInventory(
      inventory.map(item => 
        item.id === id ? { ...item, stock: parseInt(newValue), lastUpdated: new Date().toISOString().slice(0, 10) } : item
      )
    );
  };

  // Filter inventory based on search term and filters
  useEffect(() => {
    let filteredItems = [...sampleInventory];
    
    // Apply search filter
    if (searchTerm) {
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.productId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filteredItems = filteredItems.filter(item => item.category === categoryFilter);
    }
    
    // Apply stock filter
    if (stockFilter !== 'all') {
      if (stockFilter === 'low') {
        filteredItems = filteredItems.filter(item => item.stock <= 10 && item.stock > 0);
      } else if (stockFilter === 'out') {
        filteredItems = filteredItems.filter(item => item.stock === 0);
      } else if (stockFilter === 'in') {
        filteredItems = filteredItems.filter(item => item.stock > 10);
      }
    }
    
    // Apply sorting
    filteredItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setProducts(filteredItems);
  }, [searchTerm, categoryFilter, stockFilter, sortConfig, inventory]);

  // Function to render sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  // Function to get CSS class based on stock level
  const getStockLevelClass = (stock, minStock) => {
    if (stock === 0) return 'text-red-600 font-semibold';
    if (stock <= minStock) return 'text-yellow-600 font-semibold';
    return 'text-green-600';
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-secondary-800">Inventory Management</h2>
        <p className="mt-1 text-sm text-secondary-500">Track and manage product stock levels</p>
      </div>
      
      {/* Filters */}
      <div className="mb-6 bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="inventory-search" className="block text-sm font-medium text-secondary-700 mb-1">
              Search Inventory
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                id="inventory-search"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by name, SKU, or ID"
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
          
          {/* Stock level filter */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-secondary-700 mb-1">
              Stock Level
            </label>
            <select
              id="stock"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              {stockFilterOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Export button */}
          <div className="flex items-end">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Inventory table */}
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
            {products.length === 0 ? (
              <div className="p-4 sm:p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-secondary-900">No inventory items found</h3>
                <p className="mt-1 text-sm text-secondary-500">Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('name')}
                      >
                        Product {getSortIndicator('name')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        SKU
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('category')}
                      >
                        Category {getSortIndicator('category')}
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('stock')}
                      >
                        Stock {getSortIndicator('stock')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Min. Stock
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-secondary-900">{item.name}</div>
                              <div className="text-sm text-secondary-500">{item.productId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-secondary-900">{item.sku}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-secondary-900">{categories.find(c => c.id === item.category)?.name || item.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input
                              type="number"
                              min="0"
                              value={item.stock}
                              onChange={(e) => handleStockUpdate(item.id, e.target.value)}
                              className="w-16 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                            <span className={`ml-2 text-sm ${getStockLevelClass(item.stock, item.minStockLevel)}`}>
                              {item.stock === 0 ? 'Out of stock' : (item.stock <= item.minStockLevel ? 'Low stock' : '')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                          {item.minStockLevel}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                          {item.lastUpdated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                          {item.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => {
                                if (item.stock <= item.minStockLevel) {
                                  handleStockUpdate(item.id, item.stock + item.reorderQuantity);
                                  alert(`Reordered ${item.reorderQuantity} units of ${item.name}`);
                                } else {
                                  alert(`This item has sufficient stock (${item.stock}). Minimum stock level is ${item.minStockLevel}.`);
                                }
                              }} 
                              className="text-primary-600 hover:text-primary-900"
                            >
                              Reorder
                            </button>
                            <button 
                              className="text-secondary-600 hover:text-secondary-900"
                              onClick={() => {
                                const locationInfo = `Product: ${item.name}\nSKU: ${item.sku}\nLocation: ${item.location}`;
                                alert(`Location Info:\n${locationInfo}`);
                              }}
                            >
                              View Location
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

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Products */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-primary-100 rounded-md p-3 text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-secondary-500 truncate">Total Products</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-secondary-900">{inventory.length}</div>
                </dd>
              </div>
            </div>
          </div>
        </div>
        
        {/* Out of Stock */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-red-100 rounded-md p-3 text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-secondary-500 truncate">Out of Stock</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-secondary-900">
                    {inventory.filter(item => item.stock === 0).length}
                  </div>
                </dd>
              </div>
            </div>
          </div>
        </div>
        
        {/* Low Stock */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-yellow-100 rounded-md p-3 text-yellow-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-secondary-500 truncate">Low Stock</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-secondary-900">
                    {inventory.filter(item => item.stock > 0 && item.stock <= item.minStockLevel).length}
                  </div>
                </dd>
              </div>
            </div>
          </div>
        </div>
        
        {/* Total Stock Value */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-green-100 rounded-md p-3 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-secondary-500 truncate">Total Inventory Items</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-secondary-900">
                    {inventory.reduce((sum, item) => sum + item.stock, 0)}
                  </div>
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
