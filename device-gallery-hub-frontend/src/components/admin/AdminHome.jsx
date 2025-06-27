import { Link } from 'react-router-dom';

export default function AdminHome() {
  // Sample data for dashboard stats
  const stats = [
    {
      id: 1,
      name: 'Total Orders',
      stat: '243',
      change: '+12%',
      changeType: 'increase',
      path: '/admin/orders',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      id: 2,
      name: 'Total Products',
      stat: '28',
      change: '+2',
      changeType: 'increase',
      path: '/admin/products',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      id: 3,
      name: 'Low Stock Items',
      stat: '5',
      change: '-2',
      changeType: 'decrease',
      path: '/admin/inventory',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      id: 4,
      name: 'Revenue (This Month)',
      stat: '$12,954.75',
      change: '+8.1%',
      changeType: 'increase',
      path: '/admin/orders',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  // Sample recent orders data
  const recentOrders = [
    { id: 'ORD-7652', customer: 'John Smith', date: '2023-09-05', total: '$124.95', status: 'Delivered' },
    { id: 'ORD-7651', customer: 'Emma Johnson', date: '2023-09-05', total: '$79.99', status: 'Processing' },
    { id: 'ORD-7650', customer: 'Michael Brown', date: '2023-09-04', total: '$215.50', status: 'Shipped' },
    { id: 'ORD-7649', customer: 'Sarah Wilson', date: '2023-09-04', total: '$49.99', status: 'Delivered' },
    { id: 'ORD-7648', customer: 'David Lee', date: '2023-09-03', total: '$157.25', status: 'Processing' },
  ];

  // Sample popular products data
  const popularProducts = [
    { id: 1, name: 'Wireless Bluetooth Earbuds', sales: 87, stock: 23, image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80' },
    { id: 6, name: 'Portable Power Bank 10000mAh', sales: 64, stock: 18, image: 'https://images.unsplash.com/photo-1583863618799-39d4041b2f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'Type-C Fast Charging Cable', sales: 52, stock: 42, image: 'https://images.unsplash.com/photo-1589996448606-27d38c70dd4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80' },
    { id: 9, name: 'Premium Type-C Handsfree', sales: 43, stock: 5, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-primary-100 rounded-md p-3 text-primary-600">
                      {item.icon}
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <div className="text-sm font-medium text-secondary-500 truncate">{item.name}</div>
                    <div className="flex items-baseline mt-1">
                      <div className="text-2xl font-semibold text-secondary-900">{item.stat}</div>
                      <div className={`ml-2 text-sm font-medium ${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <Link to={item.path} className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  View all
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-secondary-800">Recent Orders</h2>
              <Link to="/admin/orders" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </div>
          </div>
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
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                      <Link to={`/admin/orders/${order.id}`} className="hover:underline">
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-700">
                      {order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'Delivered' && 'bg-green-100 text-green-800'}
                      ${order.status === 'Shipped' && 'bg-blue-100 text-blue-800'}
                      ${order.status === 'Processing' && 'bg-yellow-100 text-yellow-800'}
                      ${order.status === 'Cancelled' && 'bg-red-100 text-red-800'}
                      `}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-secondary-800">Popular Products</h2>
              <Link to="/admin/products" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {popularProducts.map((product) => (
              <div key={product.id} className="px-6 py-4 flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-secondary-800 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center text-xs text-secondary-500 mt-1">
                    <span>{product.sales} sold</span>
                    <span className="mx-2">•</span>
                    <span className={product.stock < 10 ? 'text-red-600 font-medium' : ''}>
                      {product.stock} in stock
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
