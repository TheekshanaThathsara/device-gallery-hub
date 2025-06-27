import { useState, useEffect } from 'react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Tech Enthusiast',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612c68e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      content: 'Amazing quality cables! I\'ve been using their Type-C cables for months and they still work perfectly. Fast charging and durable construction.',
      rating: 5,
      product: 'Type-C Fast Charging Cable'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Mobile Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      content: 'The wireless earbuds are fantastic! Crystal clear sound quality and the battery life is incredible. Perfect for long coding sessions.',
      rating: 5,
      product: 'Wireless Earbuds Pro'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Content Creator',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      content: 'Their power bank saved my day during a 12-hour shoot! Reliable, fast charging, and compact design. Highly recommend for professionals.',
      rating: 5,
      product: '20000mAh Power Bank'
    }
  ];
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Animation for quote icon
  const [hovered, setHovered] = useState(false);
  
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 h-64 w-64 bg-blue-100 rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-64 w-64 bg-yellow-100 rounded-full opacity-50 translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white text-blue-700 text-sm font-medium mb-4 shadow-md animate-pulse">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Customer Reviews
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-800">
            What Our
            <span className="text-blue-600 relative ml-2">
              Customers Say
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-400 rounded-full"></span>
            </span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
            Join thousands of satisfied customers who trust us for their mobile accessory needs
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mt-16 mb-20">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-500 hover:shadow-2xl">
            <div className="md:grid md:grid-cols-5">
              {/* Featured Customer Image and Info */}
              <div className="relative md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800">
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                      <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#fff"></circle>
                    </pattern>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
                  </svg>
                </div>
                
                <div className="relative p-10 h-full flex flex-col justify-between">
                  <div 
                    className="w-16 h-16 bg-blue-100 bg-opacity-20 rounded-full flex items-center justify-center mb-8"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    <svg className={`w-8 h-8 text-white transition-transform duration-500 ${hovered ? 'rotate-12' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <img 
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        className="h-16 w-16 rounded-full object-cover border-2 border-white"
                      />
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-white">{testimonials[activeIndex].name}</h3>
                        <p className="text-blue-100">{testimonials[activeIndex].role}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <div className="inline-block bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                        <p className="text-white">Product: <span className="font-medium">{testimonials[activeIndex].product}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial Text */}
              <div className="md:col-span-3 p-8 md:p-12">
                <div className="h-full flex flex-col justify-between">
                  <div className="relative" style={{ minHeight: '150px' }}>
                    {testimonials.map((testimonial, index) => (
                      <div 
                        key={testimonial.id}
                        className={`absolute inset-0 transition-all duration-700 ${
                          index === activeIndex 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-8'
                        }`}
                        style={{ display: index === activeIndex ? 'block' : 'none' }}
                      >
                        <p className="text-2xl font-medium text-gray-600 italic leading-relaxed">
                          "{testimonial.content}"
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-100">
                    <p className="text-gray-500 text-sm">
                      {activeIndex + 1} of {testimonials.length} testimonials
                    </p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)}
                        className="w-10 h-10 rounded-full border border-blue-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}
                        className="w-10 h-10 rounded-full border border-blue-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-blue-600 mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span>10K</span>
                <span className="text-yellow-500 text-xl ml-1">+</span>
              </div>
              <div className="text-gray-600 text-sm md:text-base">Happy Customers</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-blue-600 mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span>4.9</span>
                <svg className="w-6 h-6 ml-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="text-gray-600 text-sm md:text-base">Average Rating</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-blue-600 mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span>100</span>
                <span className="text-yellow-500 text-xl ml-1">+</span>
              </div>
              <div className="text-gray-600 text-sm md:text-base">Products</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-blue-600 mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span>24/7</span>
              </div>
              <div className="text-gray-600 text-sm md:text-base">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
