import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/admin', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    )},
    { name: 'Products', path: '/admin/products', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
      </svg>
    )},
    { name: 'Orders', path: '/admin/orders', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
      </svg>
    )},
    { name: 'Inventory', path: '/admin/inventory', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
      </svg>
    )},
  ];

  return (
    <div className="flex bg-secondary-50 min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-primary-600">Admin Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                isActiveRoute(item.path)
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-secondary-600 hover:bg-secondary-50'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Link
            to="/"
            className="flex items-center px-4 py-3 text-sm font-medium text-secondary-600 hover:bg-secondary-50 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Mobile menu */}
      <div className="lg:hidden">
        <div className="fixed inset-0 z-40 bg-secondary-800 bg-opacity-75 transition-opacity ease-linear duration-300"
          style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white overflow-y-auto transition duration-300 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
            <h2 className="text-xl font-semibold text-primary-600">Admin Dashboard</h2>
            <button
              type="button"
              className="text-secondary-600 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  isActiveRoute(item.path)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-secondary-600 hover:bg-secondary-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/"
              className="flex items-center px-4 py-3 text-sm font-medium text-secondary-600 hover:bg-secondary-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Back to Store
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Top header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 lg:px-8">
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden text-secondary-600 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="ml-4 lg:ml-0 text-lg font-semibold text-secondary-800">
                {navigationItems.find((item) => isActiveRoute(item.path))?.name || 'Dashboard'}
              </h1>
            </div>
            
            {/* Admin profile */}
            <div className="flex items-center">
              <button
                type="button"
                className="flex items-center focus:outline-none"
              >
                <span className="hidden lg:block mr-3 text-sm font-medium text-secondary-700">Admin User</span>
                <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
                  A
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
