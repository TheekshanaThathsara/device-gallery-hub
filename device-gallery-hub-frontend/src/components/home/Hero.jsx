export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-primary-50 to-secondary-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative pt-10 pb-14 sm:pt-16 sm:pb-20 md:pb-28 lg:pt-24 lg:pb-32">
          <div className="mt-10 max-w-2xl mx-auto sm:mt-12 md:mt-16 md:max-w-3xl lg:mt-20 lg:max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-secondary-800 sm:text-5xl md:text-6xl">
                <span className="block">Premium Accessories for</span>
                <span className="block text-primary-600">Your Mobile Devices</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-secondary-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Discover high-quality accessories that enhance your mobile experience. From durable cables to powerful chargers, we've got everything you need.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <a
                    href="#products"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 md:py-4 md:text-lg md:px-10"
                  >
                    Shop Now
                  </a>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <a
                    href="#featured"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-secondary-50 md:py-4 md:text-lg md:px-10"
                  >
                    Featured Items
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorator elements - tech circles and dots */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block opacity-20">
            <svg width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
              <defs>
                <pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-primary-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 hidden lg:block opacity-20">
            <svg width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
              <defs>
                <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-primary-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
