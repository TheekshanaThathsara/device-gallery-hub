import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';

// Import local images
import chargerImg from '../../assets/images/charger.jpg';
import datacableImg from '../../assets/images/datacable.jpg';
import powerbankImg from '../../assets/images/powerbank.jpg';
import handsfreeImg from '../../assets/images/categories/handsfree.jpg';
import earbudsImg from '../../assets/images/categories/earbuds.jpg';

export default function CategorySection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  const categories = [
    {
      id: 1,
      title: 'Handsfrees',
      description: 'High-quality micro & type-C handsfree options',
      imageUrl: handsfreeImg,
    },
    {
      id: 2,
      title: 'Data Cables',
      description: 'Premium braided cables with fast data transfer & durable connectors',
      imageUrl: datacableImg,
    },
    {
      id: 3,
      title: 'Power Banks',
      description: 'Slim & powerful portable chargers with fast charging technology',
      imageUrl: powerbankImg,
    },
    {
      id: 4,
      title: 'Chargers',
      description: 'Multi-port fast chargers with GaN technology for all devices',
      imageUrl: chargerImg,
    },
    {
      id: 5,
      title: 'Earbuds',
      description: 'Wireless earbuds with premium sound quality',
      imageUrl: earbudsImg,
    },
  ];

  return (
    <section id="products" className="py-16 bg-gradient-to-b from-white to-secondary-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Popular Categories
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-secondary-800">
            Browse Our
            <span className="text-primary-600"> Categories</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-secondary-600 leading-relaxed">
            Find the perfect accessories for your mobile devices. From essential cables to cutting-edge wireless technology.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className={`transform transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`} 
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CategoryCard
                title={category.title}
                description={category.description}
                imageUrl={category.imageUrl}
              />
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <p className="text-secondary-600 mb-6">Can't find what you're looking for?</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            View All Products
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
