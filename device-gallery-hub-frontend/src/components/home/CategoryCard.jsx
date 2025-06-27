import { Link } from 'react-router-dom';

export default function CategoryCard({ title, icon, description }) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2">
      <div className="p-6 relative">
        {/* Gradient background overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          {/* Icon container with enhanced styling */}
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <div className="transform group-hover:rotate-6 transition-transform duration-300">
              {icon}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-secondary-800 group-hover:text-primary-700 transition-colors duration-300">
            {title}
          </h3>
          <p className="mt-3 text-sm text-secondary-600 leading-relaxed">{description}</p>
          
          {/* Enhanced button */}
          <div className="mt-6">
            <Link
              to={`/shop?category=${title.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-transparent text-sm font-semibold rounded-xl text-primary-600 bg-primary-50 hover:bg-primary-600 hover:text-white transition-all duration-300 group-hover:shadow-lg transform group-hover:scale-105"
            >
              Explore {title}
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Decorative dots */}
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-400 rounded-full mt-1 ml-1"></div>
        </div>
      </div>
    </div>
  );
}
