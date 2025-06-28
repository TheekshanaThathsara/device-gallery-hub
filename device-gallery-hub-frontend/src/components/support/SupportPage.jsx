import { useState } from 'react';
import { Link } from 'react-router-dom';

// Import product images for the FAQ section illustrations
import earbud1 from '../../assets/images/products/earbuds1.jpg';
import charger1 from '../../assets/images/products/charger1.jpg';
import powerbank1 from '../../assets/images/products/powerbank1.jpg';

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [activeAccordion, setActiveAccordion] = useState('faq-1');
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    subject: '',
    message: ''
  });

  // Toggle FAQ accordion
  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    alert('Thank you for contacting us! We will get back to you shortly.');
    // Reset form
    setContactFormData({
      name: '',
      email: '',
      orderId: '',
      subject: '',
      message: ''
    });
  };

  // Add invisible anchor elements for section navigation
  const sections = [
    { id: 'shipping', title: 'Shipping Information' },
    { id: 'returns', title: 'Returns & Refunds' },
    { id: 'terms', title: 'Terms of Service' },
    { id: 'privacy', title: 'Privacy Policy' }
  ];

  // FAQ data
  const faqs = {
    general: [
      {
        id: 'faq-1',
        question: 'How do I track my order?',
        answer: 'You can track your order by logging into your account and visiting the "Orders" section. Alternatively, you can use the tracking number provided in your order confirmation email to track your package on our shipping partner\'s website.'
      },
      {
        id: 'faq-2',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. We also offer payment installment options through Klarna and Afterpay.'
      },
      {
        id: 'faq-3',
        question: 'How long does shipping take?',
        answer: 'Standard shipping typically takes 3-5 business days. Express shipping is available for an additional fee and delivers within 1-2 business days. International shipping may take 7-14 business days depending on the destination.'
      },
      {
        id: 'faq-4',
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. International shipping fees and delivery times vary depending on the destination. Please note that customs fees may apply for international orders.'
      },
    ],
    returns: [
      {
        id: 'faq-5',
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for most products. Items must be in their original packaging and in unused condition. Some products like earbuds have special hygiene restrictions, please see our detailed return policy for more information.'
      },
      {
        id: 'faq-6',
        question: 'How do I initiate a return?',
        answer: 'To initiate a return, log into your account, go to "Order History," select the relevant order, and click "Return Items." Follow the instructions to generate a return label. If you checked out as a guest, you can use the link in your order confirmation email.'
      },
      {
        id: 'faq-7',
        question: 'How long does it take to process a refund?',
        answer: 'Once we receive your returned item, it takes 1-2 business days for our quality team to inspect it. After approval, refunds are processed within 3-5 business days, though it may take longer for the funds to appear in your account depending on your financial institution.'
      },
    ],
    product: [
      {
        id: 'faq-8',
        question: 'Do your products come with a warranty?',
        answer: 'Yes, all our products come with a minimum 1-year manufacturer warranty. Premium products like high-end earbuds and power banks come with extended 2-year warranties. Warranty information is included in the product packaging.'
      },
      {
        id: 'faq-9',
        question: 'Are your chargers and cables certified?',
        answer: 'Yes, all our charging products are certified. Our cables are MFi (Made for iPhone/iPad/iPod) certified for Apple products, and our chargers meet all safety and regulatory requirements, including UL, CE, and FCC certifications.'
      },
      {
        id: 'faq-10',
        question: 'How do I know which cable is compatible with my device?',
        answer: 'Our product descriptions clearly indicate device compatibility. You can also use the "Compatibility Checker" tool on our site by selecting your device model. If you\'re still unsure, our support team can help you find the right cable for your device.'
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-600 py-16 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              How Can We Help You?
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-50">
              Get answers to your questions, troubleshooting tips, and support from our team.
            </p>
          </div>
          
          {/* Search Box */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-full px-8 py-4 border-0 shadow-lg focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Search for answers..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-blue-800 opacity-10">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0M20 40L40 20M0 20L20 0" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 hover:shadow-lg">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
              <p className="mt-2 text-sm text-gray-500">Get in touch with our customer support team</p>
              <button onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })} className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                Reach Out
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 hover:shadow-lg">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Track Order</h3>
              <p className="mt-2 text-sm text-gray-500">Check the status of your recent orders</p>
              <Link to="/track-order" className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                Track Now
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 hover:shadow-lg">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Returns</h3>
              <p className="mt-2 text-sm text-gray-500">Initiate returns and check policies</p>
              <Link to="/returns" className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                Return Items
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 hover:shadow-lg">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Product Manuals</h3>
              <p className="mt-2 text-sm text-gray-500">Download guides and documentation</p>
              <Link to="/manuals" className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                View Manuals
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-500">Find answers to common questions about our products and services.</p>
        </div>

        {/* FAQ tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          <button 
            onClick={() => setActiveTab('general')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'general' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            General Questions
          </button>
          <button 
            onClick={() => setActiveTab('returns')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'returns' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Returns & Refunds
          </button>
          <button 
            onClick={() => setActiveTab('product')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'product' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Product Information
          </button>
        </div>

        {/* FAQ Items with Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs[activeTab].map((faq) => (
            <div
              key={faq.id}
              className="mb-4 border-b border-gray-200 pb-4"
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <span className="ml-6 flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      activeAccordion === faq.id ? 'transform rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`mt-2 overflow-hidden transition-all duration-300 ${
                  activeAccordion === faq.id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="text-base text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Support Categories</h2>
          <p className="mt-4 text-lg text-gray-500">Browse support articles by product category</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={earbud1} 
                alt="Earbuds Support" 
                className="w-full h-full object-cover transform transition duration-700 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Earbuds & Audio</h3>
              <p className="text-gray-600 mb-4">Troubleshooting guides, pairing instructions, and care tips for audio products.</p>
              <Link to="/support/category/earbuds" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                View guides
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={charger1} 
                alt="Charging Solutions Support" 
                className="w-full h-full object-cover transform transition duration-700 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Charging Solutions</h3>
              <p className="text-gray-600 mb-4">Information about chargers, cables, compatibility, and troubleshooting charging issues.</p>
              <Link to="/support/category/charging" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                View guides
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={powerbank1} 
                alt="Power Banks Support" 
                className="w-full h-full object-cover transform transition duration-700 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Power Banks</h3>
              <p className="text-gray-600 mb-4">Usage instructions, maintenance tips, and answers to common power bank questions.</p>
              <Link to="/support/category/powerbanks" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                View guides
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div id="contact-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-600 p-2 rounded-md">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium">Phone</p>
                    <p className="mt-1">+1 (800) 123-4567</p>
                    <p className="mt-1 text-sm text-blue-200">Mon-Fri: 9am - 6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-600 p-2 rounded-md">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium">Email</p>
                    <p className="mt-1">support@devicegalleryhub.com</p>
                    <p className="mt-1 text-sm text-blue-200">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-600 p-2 rounded-md">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium">Address</p>
                    <p className="mt-1">123 Tech Avenue</p>
                    <p className="mt-1">San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-lg font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactFormData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactFormData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID (optional)</label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    value={contactFormData.orderId}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={contactFormData.subject}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="order-issue">Order Issue</option>
                    <option value="product-question">Product Question</option>
                    <option value="return-request">Return Request</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="billing-issue">Billing Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={contactFormData.message}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                    required
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Invisible anchors for footer navigation */}
      {sections.map(section => (
        <div 
          key={section.id} 
          id={section.id} 
          className="scroll-mt-24" // Add padding to account for fixed header
          style={{ position: 'relative', top: '-100px', visibility: 'hidden' }}
          aria-hidden="true"
        />
      ))}

      {/* Live Chat CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Live Chat
        </button>
      </div>
    </div>
  );
};

export default SupportPage;
