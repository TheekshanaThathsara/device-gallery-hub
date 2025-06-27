export default function CategoryCard({ title, icon, description }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-secondary-800">{title}</h3>
        <p className="mt-2 text-sm text-secondary-500">{description}</p>
        <div className="mt-4">
          <a
            href={`/category/${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100"
          >
            Shop Now
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
