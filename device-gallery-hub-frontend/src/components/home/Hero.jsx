import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #0891b2 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative pt-10 pb-14 sm:pt-16 sm:pb-20 md:pb-28 lg:pt-24 lg:pb-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className={`sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Premium</span>
                <span className="block text-yellow-400 drop-shadow-md">Mobile Accessories</span>
                <span className="block text-2xl sm:text-3xl md:text-4xl font-medium text-blue-100 mt-2">
                  for Modern Life
                </span>
              </h1>
              <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 leading-relaxed">
                Discover high-quality accessories that enhance your mobile experience. From durable cables to powerful chargers, we've got everything you need.
              </p>
              
              {/* Stats */}
              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-blue-200">
                <div className="flex items-center backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 transition-transform hover:scale-105">
                  <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100+ Products</span>
                </div>
                <div className="flex items-center backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 transition-transform hover:scale-105">
                  <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 transition-transform hover:scale-105">
                  <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quality Guarantee</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 group"
                  >
                    <svg className="mr-2 h-5 w-5 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Shop Now
                  </Link>
                  <button className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-lg text-white bg-transparent hover:bg-white hover:text-blue-600 transition-all duration-200 backdrop-blur-sm bg-white/5 group">
                    <svg className="mr-2 h-5 w-5 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View Catalog
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content - Product Showcase */}
            <div className={`mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
                {/* Floating Product Cards */}
                <div className="relative">
                  {/* Main product card */}
                  <div className="relative bg-white rounded-xl shadow-2xl p-6 transform hover:rotate-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-blue-500/20 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded animate-pulse">New</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Fast Charging Cable</h3>
                    <p className="text-gray-600 text-sm mt-1">Type-C & Micro USB</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-bold text-blue-600">$14.99</span>
                      <div className="flex items-center text-yellow-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                        <span className="text-gray-600 text-sm ml-1">4.8</span>
                      </div>
                    </div>
                  </div>

                  {/* Secondary floating cards */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 transform hover:-rotate-6 hover:-translate-y-1 transition-transform duration-300 hover:shadow-blue-500/20 backdrop-blur-md">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <p className="text-xs font-medium text-gray-700 mt-2">Wireless Earbuds</p>
                    <p className="text-blue-600 font-bold text-sm">$79.99</p>
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 transform hover:rotate-6 hover:-translate-y-1 transition-transform duration-300 hover:shadow-blue-500/20 backdrop-blur-md">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-xs font-medium text-gray-700 mt-2">Power Bank</p>
                    <p className="text-blue-600 font-bold text-sm">$24.99</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-white/10 to-white/5 opacity-30 blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-br from-white/10 to-white/5 opacity-30 blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
            
            {/* Floating tech icons */}
            <div className="absolute top-20 right-20 animate-bounce delay-1000">
              <div className="w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-20 left-20 animate-bounce delay-500">
              <div className="w-6 h-6 bg-white/30 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-lg">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            
            {/* Added floating elements */}
            <div className="absolute top-1/3 left-1/4 animate-ping" style={{ animationDuration: '4s' }}>
              <div className="w-4 h-4 bg-yellow-400/30 rounded-full"></div>
            </div>
            <div className="absolute bottom-1/3 right-1/4 animate-ping" style={{ animationDuration: '6s' }}>
              <div className="w-4 h-4 bg-blue-400/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
