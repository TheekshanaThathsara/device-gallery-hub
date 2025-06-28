import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ImageGallery from './ImageGallery';
import QuantitySelector from './QuantitySelector';
import RelatedProducts from './RelatedProducts';

// Import local images for mock data and fallbacks
import chargerImg from '../../assets/images/charger.jpg';
import datacableImg from '../../assets/images/datacable.jpg';
import powerbankImg from '../../assets/images/powerbank.jpg';
import earbudsImg from '../../assets/images/categories/earbuds.jpg';
import handsfreeImg from '../../assets/images/categories/handsfree.jpg';

// Import product images - using the same images available in NewArrivalsPage
import cable1Img from '../../assets/images/products/cable1.jpg';
import cable2Img from '../../assets/images/products/cable2.jpg';
import cable3Img from '../../assets/images/products/cable3.jpg';
import cable4Img from '../../assets/images/products/cable4.jpeg';
import cable5Img from '../../assets/images/products/cable5.jpeg';
import cable6Img from '../../assets/images/products/cable6.jpeg';
import powerbank1Img from '../../assets/images/products/powerbank1.jpg';
import powerbank2Img from '../../assets/images/products/powerbank2.jpg';
import powerbank3Img from '../../assets/images/products/powerbank3.jpeg';
import charger1Img from '../../assets/images/products/charger1.jpg';
import charger2Img from '../../assets/images/products/charger2.jpg';
import charger3Img from '../../assets/images/products/charger3.jpeg';
import handsfree1Img from '../../assets/images/products/handsfree1.jpg';
import handsfree2Img from '../../assets/images/products/handsfree2.jpg';
import handsfree3Img from '../../assets/images/products/handsfree3.jpg';
import handsfree4Img from '../../assets/images/products/handsfree4.jpg';
import earbuds1Img from '../../assets/images/products/earbuds1.jpg';
import earbuds2Img from '../../assets/images/products/earbuds2.jpeg';
import earbuds3Img from '../../assets/images/products/earbuds3.jpg';
import earbuds4Img from '../../assets/images/products/earbuds4.jpg';
import earbuds5Img from '../../assets/images/products/earbuds5.jpg';

// Mock products database - this would normally come from an API
const mockProducts = {
  // Each product has data matching our NewArrivalsPage structure with additional details
  '101': {
    id: '101',
    name: 'Next Gen Type-C Fast Charging Cable',
    category: 'cables',
    categoryName: 'Cables',
    subcategory: 'Type-C',
    price: 16.99,
    oldPrice: 21.99,
    discount: 22,
    stock: 25,
    image: cable1Img,
    isNew: true,
    arrivalDate: '2025-06-15',
    description: "Experience lightning-fast charging and data transfer with our Next Gen Type-C cable. Built with premium materials for durability and designed to deliver optimal power to your devices. Perfect for smartphones, tablets, and laptops that support USB-C connectivity.",
    features: [
      'Fast charging up to 100W with PD support',
      'Data transfer speeds up to 10Gbps',
      'Reinforced connectors to prevent fraying',
      'Durable braided nylon construction',
      '1.5-meter length for convenience',
      'Compatible with all Type-C devices'
    ],
    specifications: {
      'Length': '1.5 meters',
      'Connector Type': 'USB-C to USB-A',
      'Maximum Power': '100W',
      'Data Transfer Rate': '10 Gbps',
      'Material': 'Braided Nylon',
      'Warranty': '18 months'
    },
    images: [cable1Img, cable2Img, cable3Img]
  },
  '102': {
    id: '102',
    name: 'Braided Lightning Cable Pro',
    category: 'cables',
    categoryName: 'Cables',
    subcategory: 'Lightning',
    price: 14.99,
    oldPrice: 19.99,
    discount: 25,
    stock: 18,
    image: cable2Img,
    isNew: true,
    arrivalDate: '2025-06-10',
    description: "Our premium Braided Lightning Cable Pro delivers fast charging and data transfer for all your Apple devices. The durable nylon braiding prevents tangling and ensures the cable withstands daily wear and tear.",
    features: [
      'Apple MFi certified for safety',
      'Fast charging for iPhone and iPad',
      'Data sync capability up to 480Mbps',
      'Tangle-free braided design',
      'Reinforced stress points for durability',
      'Compatible with all Lightning port devices'
    ],
    specifications: {
      'Length': '1.8 meters',
      'Connector Type': 'Lightning to USB-A',
      'Maximum Power': '18W',
      'Data Transfer Rate': '480 Mbps',
      'Material': 'Nylon Braided',
      'Warranty': '12 months'
    },
    images: [cable2Img, cable1Img, cable3Img]
  },
  '103': {
    id: '103',
    name: 'Wireless Earbuds Pro Max',
    category: 'audio',
    categoryName: 'Audio',
    subcategory: 'Earbuds',
    price: 89.99,
    oldPrice: 119.99,
    discount: 25,
    stock: 10,
    image: earbuds1Img,
    isNew: true,
    arrivalDate: '2025-06-20',
    description: "Experience premium sound quality with our Wireless Earbuds Pro Max. Featuring active noise cancellation, crystal-clear audio, and a comfortable fit for all-day wear. Perfect for music, calls, and workouts.",
    features: [
      'Active Noise Cancellation technology',
      'Up to 8 hours of playback time (24 hours with case)',
      'IPX5 water and sweat resistant',
      'Touch controls for easy operation',
      'Voice assistant compatibility',
      'Premium sound with enhanced bass'
    ],
    specifications: {
      'Battery Life': '8 hours (24 with case)',
      'Bluetooth Version': '5.2',
      'Charging': 'USB-C and Wireless',
      'Water Resistance': 'IPX5',
      'Weight': '5.7g per earbud',
      'Warranty': '12 months'
    },
    images: [earbuds1Img, earbuds2Img, earbuds3Img]
  },
  '104': {
    id: '104',
    name: 'Premium Sport Earphones',
    category: 'audio',
    categoryName: 'Audio',
    subcategory: 'Earbuds',
    price: 59.99,
    oldPrice: 79.99,
    discount: 25,
    stock: 15,
    image: earbuds2Img,
    isNew: true,
    arrivalDate: '2025-06-18',
    description: "Engineered for athletes and fitness enthusiasts, our Premium Sport Earphones deliver exceptional sound quality while staying securely in place during even the most intense workouts.",
    features: [
      'Secure fit ear hooks for sports activities',
      'Waterproof and sweatproof with IPX7 rating',
      'Up to 10 hours of continuous playback',
      'Quick charge: 10 minutes for 1 hour of playtime',
      'Built-in microphone for calls',
      'Premium bass-enhanced sound'
    ],
    specifications: {
      'Battery Life': '10 hours',
      'Bluetooth Version': '5.0',
      'Charging': 'USB-C',
      'Water Resistance': 'IPX7',
      'Weight': '18g',
      'Warranty': '12 months'
    },
    images: [earbuds2Img, earbuds4Img, earbuds5Img]
  },
  '105': {
    id: '105',
    name: '25000mAh Power Bank with PD',
    category: 'power',
    categoryName: 'Power',
    subcategory: 'Power Banks',
    price: 49.99,
    oldPrice: 69.99,
    discount: 28,
    stock: 12,
    image: powerbank1Img,
    isNew: true,
    arrivalDate: '2025-06-12',
    description: "Keep all your devices powered on the go with our high-capacity 25000mAh power bank. Featuring Power Delivery technology for fast charging of smartphones, tablets, and even laptops.",
    features: [
      '25000mAh high capacity battery',
      'Power Delivery up to 65W',
      'Quick Charge 4.0 compatible',
      'Charges laptops, tablets, and phones',
      'Digital display shows remaining power',
      'Multiple ports for simultaneous charging'
    ],
    specifications: {
      'Capacity': '25000mAh',
      'Input': 'USB-C PD (20W)',
      'Output': 'USB-C PD (65W), USB-A QC 4.0 (18W)',
      'Dimensions': '15cm x 7cm x 2.5cm',
      'Weight': '435g',
      'Warranty': '24 months'
    },
    images: [powerbank1Img, powerbank2Img, powerbank3Img]
  },
  '106': {
    id: '106',
    name: '65W GaN Fast Charger',
    category: 'chargers',
    categoryName: 'Chargers',
    subcategory: 'Wall Chargers',
    price: 39.99,
    oldPrice: 59.99,
    discount: 33,
    stock: 20,
    image: charger1Img,
    isNew: true,
    arrivalDate: '2025-06-14',
    description: "Our 65W GaN Fast Charger is smaller, cooler, and more efficient than traditional chargers. Power up your laptop, tablet, and phone simultaneously with multiple ports and intelligent power distribution.",
    features: [
      'GaN technology for efficient charging',
      '65W total output across ports',
      'Compatible with laptops, tablets, and phones',
      'Intelligent power distribution',
      'Compact design - 40% smaller than silicon chargers',
      'Advanced thermal management'
    ],
    specifications: {
      'Input': '100-240V AC',
      'Total Output': '65W',
      'Ports': '2x USB-C PD, 1x USB-A',
      'Dimensions': '5cm x 5cm x 3cm',
      'Weight': '120g',
      'Warranty': '18 months'
    },
    images: [charger1Img, charger2Img, charger3Img]
  },
  '107': {
    id: '107',
    name: 'Premium Car Handsfree Kit',
    category: 'handsfree',
    categoryName: 'Handsfree',
    subcategory: 'Car Accessories',
    price: 34.99,
    oldPrice: 44.99,
    discount: 22,
    stock: 15,
    image: handsfree1Img,
    isNew: true,
    arrivalDate: '2025-06-16',
    description: "Stay safe while driving with our Premium Car Handsfree Kit. Features noise-cancellation technology, voice commands, and seamless Bluetooth connectivity for crystal clear calls while on the road.",
    features: [
      'Advanced noise cancellation technology',
      'Voice command support',
      'Auto-connect with paired devices',
      'Dual microphone for clear calls',
      'Battery life up to 20 hours',
      'Magnetic mount for easy placement'
    ],
    specifications: {
      'Bluetooth Version': '5.1',
      'Battery Life': '20 hours talk time',
      'Charging': 'USB-C',
      'Noise Cancellation': 'Dual microphone CVC 8.0',
      'Weight': '45g',
      'Warranty': '12 months'
    },
    images: [handsfree1Img, handsfree2Img, handsfree3Img]
  },
  '108': {
    id: '108',
    name: 'MagSafe Wireless Charger Pro',
    category: 'chargers',
    categoryName: 'Chargers',
    subcategory: 'Wireless',
    price: 44.99,
    oldPrice: 54.99,
    discount: 18,
    stock: 22,
    image: charger2Img,
    isNew: true,
    arrivalDate: '2025-06-22',
    description: "Experience the convenience of magnetic wireless charging with our MagSafe Wireless Charger Pro. Perfect alignment every time with strong magnets and fast 15W charging for compatible devices.",
    features: [
      'MagSafe compatible with perfect alignment',
      'Fast 15W wireless charging',
      'Premium aluminum and soft-touch materials',
      'Built-in safety features',
      'Slim, portable design',
      'LED charging indicator'
    ],
    specifications: {
      'Input': 'USB-C PD',
      'Output': '15W max',
      'Compatibility': 'MagSafe devices, Qi wireless standard',
      'Cable Length': '1.5m',
      'Dimensions': '8cm diameter',
      'Warranty': '18 months'
    },
    images: [charger2Img, charger1Img, charger3Img]
  },
  '109': {
    id: '109',
    name: '10000mAh Slim Power Bank',
    category: 'power',
    categoryName: 'Power',
    subcategory: 'Power Banks',
    price: 29.99,
    oldPrice: 39.99,
    discount: 25,
    stock: 30,
    image: powerbank2Img,
    isNew: true,
    arrivalDate: '2025-06-19',
    description: "Our 10000mAh Slim Power Bank combines portability with power. Only 0.5 inches thick, it easily fits in your pocket while providing enough juice to fully charge your smartphone multiple times.",
    features: [
      'Ultra-slim 0.5-inch profile',
      '10000mAh capacity',
      '18W Fast charging support',
      'Dual output ports',
      'LED power indicator',
      'Premium aluminum construction'
    ],
    specifications: {
      'Capacity': '10000mAh',
      'Input': 'USB-C (18W)',
      'Output': 'USB-C (18W), USB-A (12W)',
      'Dimensions': '14cm x 7cm x 1.3cm',
      'Weight': '195g',
      'Warranty': '18 months'
    },
    images: [powerbank2Img, powerbank1Img, powerbank3Img]
  },
  '110': {
    id: '110',
    name: 'Premium Tangle-Free USB Cable',
    category: 'cables',
    categoryName: 'Cables',
    subcategory: 'USB',
    price: 15.99,
    oldPrice: 19.99,
    discount: 20,
    stock: 35,
    image: cable3Img,
    isNew: true,
    arrivalDate: '2025-06-26',
    description: "Never deal with cable tangles again. Our Premium Tangle-Free USB Cable features a special flat design and robust materials that resist tangling and twisting for hassle-free charging and data transfer.",
    features: [
      'Unique flat cable design prevents tangles',
      'Premium quality connectors',
      'Reinforced strain relief',
      'Fast charging supported',
      '480Mbps data transfer speed',
      '3-meter extra-long design'
    ],
    specifications: {
      'Length': '3 meters',
      'Connector Type': 'USB-A to Micro USB',
      'Maximum Power': '12W',
      'Data Transfer Rate': '480 Mbps',
      'Material': 'Premium PVC',
      'Warranty': '12 months'
    },
    images: [cable3Img, cable1Img, cable2Img]
  },
  // Add additional products to match all from NewArrivalsPage
};

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  
  useEffect(() => {
    // Scroll to top when product changes
    window.scrollTo(0, 0);
    
    // In a real app, you'd fetch the product data from an API
    const fetchProduct = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        // Try to get product from our mock database
        let productData = mockProducts[productId];
        
        // If we don't have this specific product, use a fallback
        if (!productData) {
          productData = {
            id: productId || '1',
            name: 'Premium Electronic Device',
            category: 'electronics',
            categoryName: 'Electronics',
            subcategory: 'Accessories',
            price: 29.99,
            oldPrice: 39.99,
            discount: 25,
            stock: 15,
            description: "This premium electronic device offers the best features and quality. Built with durable materials and advanced technology, it's designed to enhance your digital experience.",
            features: [
              'High quality construction',
              'Advanced features',
              'Long battery life',
              'Durable design',
              'Versatile connectivity options',
              'Compatible with most devices'
            ],
            specifications: {
              'Material': 'Premium Components',
              'Warranty': '12 months',
              'Compatibility': 'Universal'
            },
            images: [chargerImg, datacableImg, powerbankImg]
          };
        }
        
        setProduct(productData);
        setLoading(false);
      }, 500);
    };
    
    fetchProduct();
  }, [productId]);
  
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };
  
  const addToCart = () => {
    // In a real app, you'd update the cart in your state management system
    console.log(`Added ${quantity} of product ${productId} to cart`);
    alert(`Added ${quantity} item(s) to your cart!`);
    // Navigate to cart page or show cart toast/modal
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
