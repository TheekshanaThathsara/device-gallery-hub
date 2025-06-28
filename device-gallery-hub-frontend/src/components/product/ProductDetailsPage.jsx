import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ImageGallery from './ImageGallery';
import QuantitySelector from './QuantitySelector';
import RelatedProducts from './RelatedProducts';

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  
  useEffect(() => {
    // In a real app, you'd fetch the product data from an API
    // For this example, we'll use mock data
    const fetchProduct = () => {
      setLoading(true);
      
      // Simulating API fetch delay
      setTimeout(() => {
        // Mock product data
        const mockProduct = {
          id: productId || '1',
          name: 'Premium Type-C Fast Charging Cable',
          category: 'data-cables',
          categoryName: 'Data Cables',
          subcategory: 'Type-C',
          price: 14.99,
          oldPrice: 19.99,
          discount: 25,
          stock: 15,
          description: "This premium Type-C cable offers fast charging and data transfer speeds. Built with durable materials and reinforced connectors, it's designed to last longer than standard cables. The 2-meter length gives you flexibility to use your device while charging.",
          features: [
            'Fast charging up to 60W',
            'Data transfer speeds of 480 Mbps',
            'Reinforced connectors to prevent fraying',
            'Durable braided nylon construction',
            '2-meter length for convenience',
            'Compatible with all Type-C devices'
          ],
          specifications: {
            'Length': '2 meters',
            'Connector Type': 'USB-C to USB-A',
            'Maximum Power': '60W',
            'Data Transfer Rate': '480 Mbps',
            'Material': 'Braided Nylon',
            'Warranty': '12 months'
          },
          images: [
            'https://images.unsplash.com/photo-1589996448606-27d38c70dd4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1583863788434-e62bf5cd4c1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1609692814859-8cb88f72a3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
          ]
        };
        
        setProduct(mockProduct);
        setLoading(false);
      }, 500);
    };
    
    fetchProduct();
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [productId]);
  
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };
  
  const addToCart = () => {
    // In a real app, you'd update the cart in your state management system
    console.log(`Added ${quantity} of product ${productId} to cart`);
    alert(`Added ${quantity} item(s) to your cart!`);
    // Navigate to cart page
    window.location.href = '/cart';
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg aspect-square"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-800">Product not found</h2>
          <p className="mt-2 text-secondary-600">The product you're looking for doesn't exist or has been removed.</p>
          <div className="mt-6">
            <Link 
              to="/shop" 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-secondary-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-sm">
          <Link to="/" className="text-secondary-500 hover:text-primary-600">Home</Link>
          <span className="mx-2 text-secondary-400">/</span>
          <Link to="/shop" className="text-secondary-500 hover:text-primary-600">Shop</Link>
          <span className="mx-2 text-secondary-400">/</span>
          <Link to={`/shop?category=${product.category}`} className="text-secondary-500 hover:text-primary-600">
            {product.categoryName}
          </Link>
          <span className="mx-2 text-secondary-400">/</span>
          <span className="text-secondary-800">{product.name}</span>
        </nav>
      </div>
      
      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <ImageGallery images={product.images} />
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-bold text-secondary-800">{product.name}</h1>
              
              <div className="mt-2 flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-800 rounded-full">
                  {product.categoryName}
                </span>
                {product.subcategory && (
                  <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                    {product.subcategory}
                  </span>
                )}
              </div>
              
              <div className="mt-4 flex items-end">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-secondary-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="ml-3 text-xl text-secondary-400 line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.discount > 0 && (
                  <span className="ml-4 px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-md">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              
              <div className="mt-6">
                <p className="text-secondary-600">
                  {product.description}
                </p>
              </div>
              
              <div className="mt-8 flex items-center space-x-4">
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Quantity
                  </label>
                  <QuantitySelector 
                    onChange={handleQuantityChange} 
                    initialQuantity={quantity}
                    max={product.stock} 
                  />
                </div>
                
                <div className="flex-1">
                  <button
                    onClick={addToCart}
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-6.666zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
              
              <div className="mt-6 pb-4 border-b border-gray-200">
                <div className="flex items-center text-sm text-secondary-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>In Stock: {product.stock} units available</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="mt-12">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setSelectedTab('description')}
                  className={`${
                    selectedTab === 'description'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base mx-4 sm:mx-6`}
                >
                  Description
                </button>
                <button
                  onClick={() => setSelectedTab('features')}
                  className={`${
                    selectedTab === 'features'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base mx-4 sm:mx-6`}
                >
                  Features
                </button>
                <button
                  onClick={() => setSelectedTab('specifications')}
                  className={`${
                    selectedTab === 'specifications'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base mx-4 sm:mx-6`}
                >
                  Specifications
                </button>
              </nav>
            </div>

            <div className="mt-6">
              {selectedTab === 'description' && (
                <div className="prose prose-sm sm:prose max-w-none text-secondary-600">
                  <p>{product.description}</p>
                </div>
              )}
              
              {selectedTab === 'features' && (
                <div className="prose prose-sm sm:prose max-w-none">
                  <ul className="list-disc pl-5 space-y-2 text-secondary-600">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedTab === 'specifications' && (
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-secondary-900 bg-gray-50">
                            {key}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-secondary-600">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products Section */}
      <RelatedProducts currentProductId={product.id} category={product.category} />
    </div>
  );
}
