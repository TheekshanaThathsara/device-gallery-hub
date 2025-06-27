import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  
  // Sample orders data
  const sampleOrders = [
    { 
      id: 'ORD-7652', 
      customer: 'John Smith', 
      email: 'john.smith@example.com',
      date: '2023-09-05', 
      total: 124.95,
      items: 3, 
      status: 'Delivered',
      payment: 'Credit Card',
      shipping: 'Express'
    },
    { 
      id: 'ORD-7651', 
      customer: 'Emma Johnson', 
      email: 'emma.johnson@example.com',
      date: '2023-09-05', 
      total: 79.99,
      items: 2, 
      status: 'Processing',
      payment: 'PayPal',
      shipping: 'Standard' 
    },
    { 
      id: 'ORD-7650', 
      customer: 'Michael Brown', 
      email: 'michael.brown@example.com',
      date: '2023-09-04', 
      total: 215.50,
      items: 4, 
      status: 'Shipped',
      payment: 'Credit Card',
      shipping: 'Express' 
    },
    { 
      id: 'ORD-7649', 
      customer: 'Sarah Wilson', 
      email: 'sarah.wilson@example.com',
      date: '2023-09-04', 
      total: 49.99,
      items: 1, 
      status: 'Delivered',
      payment: 'Credit Card',
      shipping: 'Standard' 
    },
    { 
      id: 'ORD-7648', 
      customer: 'David Lee', 
      email: 'david.lee@example.com',
      date: '2023-09-03', 
      total: 157.25,
      items: 3, 
      status: 'Processing',
      payment: 'PayPal',
      shipping: 'Express' 
    },
    { 
      id: 'ORD-7647', 
      customer: 'Jennifer Garcia', 
      email: 'jennifer.garcia@example.com',
      date: '2023-09-03', 
      total: 89.95,
      items: 2, 
      status: 'Cancelled',
      payment: 'Credit Card',
      shipping: 'Standard' 
    },
    { 
      id: 'ORD-7646', 
      customer: 'Robert Martinez', 
      email: 'robert.martinez@example.com',
      date: '2023-09-02', 
      total: 65.50,
      items: 1, 
      status: 'Delivered',
      payment: 'PayPal',
      shipping: 'Express' 
    },
    { 
      id: 'ORD-7645', 
      customer: 'Elizabeth Taylor', 
      email: 'elizabeth.taylor@example.com',
      date: '2023-09-02', 
      total: 129.75,
      items: 2, 
      status: 'Shipped',
      payment: 'Credit Card',
      shipping: 'Standard' 
    },
    { 
      id: 'ORD-7644', 
      customer: 'William Anderson', 
      email: 'william.anderson@example.com',
      date: '2023-09-01', 
      total: 175.25,
      items: 3, 
      status: 'Delivered',
      payment: 'Credit Card',
      shipping: 'Express' 
    },
    { 
      id: 'ORD-7643', 
      customer: 'Patricia Thomas', 
      email: 'patricia.thomas@example.com',
      date: '2023-08-31', 
      total: 45.99,
      items: 1, 
      status: 'Cancelled',
      payment: 'PayPal',
      shipping: 'Standard' 
    },
  ];

  // Status options for filter
  const statusOptions = [
    { id: 'all', name: 'All Orders' },
    { id: 'Processing', name: 'Processing' },
    { id: 'Shipped', name: 'Shipped' },
    { id: 'Delivered', name: 'Delivered' },
    { id: 'Cancelled', name: 'Cancelled' }
  ];

  // Simulate API call to fetch orders
  useEffect(() => {
    setTimeout(() => {
      setOrders(sampleOrders);
      setLoading(false);
    }, 500);
  }, []);

  // Handle status update
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    // Match search term
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Match status filter
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    // Match date range if provided
    let matchesDateRange = true;
    if (dateRange.start) {
      matchesDateRange = matchesDateRange && order.date >= dateRange.start;
    }
    if (dateRange.end) {
      matchesDateRange = matchesDateRange && order.date <= dateRange.end;
    }
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-secondary-800">Order Management</h2>
        <p className="mt-1 text-sm text-secondary-500">View and manage customer orders</p>
      </div>
      
      {/* Filters */}
      <div className="mb-6 bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-secondary-700 mb-1">
              Search Orders
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
                placeholder="Order ID or customer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Status filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-secondary-700 mb-1">
              Status
            </label>
            <select
              id="status"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date range filters */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-secondary-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              id="startDate"
              className="focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-secondary-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              id="endDate"
              className="focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Orders table */}
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
            {filteredOrders.length === 0 ? (
              <div className="p-4 sm:p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-primary-600">
                            <Link to={`/admin/orders/${order.id}`} className="hover:underline">
                              {order.id}
                            </Link>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-secondary-900">{order.customer}</div>
                          <div className="text-sm text-secondary-500">{order.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-secondary-900">{order.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-secondary-900">{order.items}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-secondary-900">
                            ${order.total.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`text-sm font-medium rounded px-2 py-1 border 
                              ${order.status === 'Delivered' && 'bg-green-50 text-green-800 border-green-200'}
                              ${order.status === 'Shipped' && 'bg-blue-50 text-blue-800 border-blue-200'}
                              ${order.status === 'Processing' && 'bg-yellow-50 text-yellow-800 border-yellow-200'}
                              ${order.status === 'Cancelled' && 'bg-red-50 text-red-800 border-red-200'}
                            `}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/admin/orders/${order.id}`}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            View
                          </Link>
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
