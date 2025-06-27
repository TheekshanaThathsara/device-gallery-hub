import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 opacity-10 rounded-full -ml-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 opacity-10 rounded-full -mr-48 -mb-48 blur-3xl"></div>
        
        {/* Animated patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-2 h-2 bg-white opacity-30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white opacity-30 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white opacity-30 rounded-full animate-ping" style={{ animationDuration: '5s' }}></div>
        </div>
        
        {/* Floating icons */}
        <div className="absolute top-20 left-20 animate-[float_3s_ease-in-out_infinite]">
          <div className="w-12 h-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-20 right-20 animate-[float_4s_ease-in-out_1s_infinite]">
          <div className="w-10 h-10 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white bg-opacity-20 backdrop-blur-sm text-white text-sm font-medium mb-6 shadow-lg transform hover:scale-105 transition-transform duration-200">
              <svg className="w-5 h-5 mr-2 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Stay Connected
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Get Exclusive
              <span className="block relative">
                Deals & Updates
                <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-yellow-400 rounded-full"></span>
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl lg:max-w-none">
              Subscribe to our newsletter and be the first to know about new products, special offers, and tech tips. Join our growing community of tech enthusiasts.
            </p>

            {/* Benefits list */}
            <div className="space-y-4 mb-8 text-left">
              <div className="flex items-center text-blue-50 bg-blue-700 bg-opacity-40 backdrop-blur-sm rounded-lg px-4 py-3 transform hover:scale-105 transition-transform duration-200 shadow-lg">
                <div className="bg-yellow-400 rounded-full p-2 mr-4">
                  <svg className="w-5 h-5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Early access to exclusive deals and sales</span>
              </div>
              <div className="flex items-center text-blue-50 bg-blue-700 bg-opacity-40 backdrop-blur-sm rounded-lg px-4 py-3 transform hover:scale-105 transition-transform duration-200 shadow-lg">
                <div className="bg-yellow-400 rounded-full p-2 mr-4">
                  <svg className="w-5 h-5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span>New product launches and feature announcements</span>
              </div>
              <div className="flex items-center text-blue-50 bg-blue-700 bg-opacity-40 backdrop-blur-sm rounded-lg px-4 py-3 transform hover:scale-105 transition-transform duration-200 shadow-lg">
                <div className="bg-yellow-400 rounded-full p-2 mr-4">
                  <svg className="w-5 h-5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Tech tips and accessory compatibility guides</span>
              </div>
            </div>
          </div>

          {/* Right side - Newsletter form */}
          <div className="mt-12 lg:mt-0 max-w-md mx-auto lg:max-w-none">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300">
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4">
                      <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Join 10,000+ Subscribers
                    </h3>
                    <p className="text-gray-600">
                      Get your exclusive welcome gift!
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="relative">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-400 shadow-sm"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center group"
                    >
                      <span>Subscribe Now</span>
                      <svg className="ml-2 -mr-1 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>

                  <div className="text-center mt-5">
                    <p className="text-xs text-gray-500">
                      By subscribing, you agree to our{' '}
                      <a href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                      . Unsubscribe at any time.
                    </p>
                  </div>

                  {/* Special offer badge */}
                  <div className="mt-6 bg-gradient-to-r from-yellow-300 to-yellow-400 text-blue-900 rounded-lg p-4 text-center shadow-md transform hover:scale-105 transition-transform duration-200">
                    <p className="font-bold">
                      🎁 Get 15% off your first order!
                    </p>
                    <p className="text-sm mt-1 text-blue-800">Limited time offer for new subscribers</p>
                  </div>
                </form>
              ) : (
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Welcome to the family!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Check your email for your welcome gift and exclusive deals.
                  </p>
                  <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium">
                    Your 15% discount code is on its way!
                  </div>
                </div>
              )}
            </div>

            {/* Trust indicators */}
            <div className="mt-6 flex items-center justify-center space-x-6 text-blue-100">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">No Spam, Ever</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm">Unsubscribe Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
