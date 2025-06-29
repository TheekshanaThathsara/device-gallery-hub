import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState('faq');
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    orderNumber: '',
    issueType: 'general-inquiry',
    message: ''
  });
  const navigate = useNavigate();

  // Toggle FAQ item expansion
  const toggleFaq = (id) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Support ticket submitted:', formValues);
    setTicketSubmitted(true);
    // Reset form
    setFormValues({
      name: '',
      email: '',
      orderNumber: '',
      issueType: 'general-inquiry',
      message: ''
    });
    
    // Reset submission status after a delay
    setTimeout(() => {
      setTicketSubmitted(false);
    }, 5000);
  };

  // Support categories data
  const categories = [
    {
      id: 'faq',
      name: 'Frequently Asked Questions',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'contact',
      name: 'Contact Us',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'shipping',
      name: 'Shipping Information',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      )
    },
    {
      id: 'returns',
      name: 'Returns & Refunds',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
        </svg>
      )
    },
    {
      id: 'terms',
      name: 'Terms of Service',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'privacy',
      name: 'Privacy Policy',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
  ];

  // FAQ data
  const faqData = [
    {
      id: 'faq-1',
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-5 business days within the continental United States. Express shipping options are available at checkout for 1-2 day delivery. International shipping times vary by location but generally take 7-14 business days.'
    },
    {
      id: 'faq-2',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items in new and unused condition. Some products have specific return windows and conditions. Please check our Returns & Refunds section for detailed information on specific product categories.'
    },
    {
      id: 'faq-3',
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive a shipping confirmation email with a tracking number. You can also view your order status and tracking information in your account under "Order History".'
    },
    {
      id: 'faq-4',
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location. Import duties and taxes may apply and are the responsibility of the customer.'
    },
    {
      id: 'faq-5',
      question: 'Are your products covered by warranty?',
      answer: 'Yes, all our products come with a minimum 12-month warranty against manufacturing defects. Premium products may have extended warranty options. Check individual product pages for specific warranty information.'
    },
    {
      id: 'faq-6',
      question: 'How can I get technical support for my device?',
      answer: 'Technical support is available through multiple channels. You can contact our support team via email, phone, or live chat. We also have a comprehensive knowledge base with troubleshooting guides for common issues.'
    },
    {
      id: 'faq-7',
      question: 'Do you offer price matching?',
      answer: 'Yes, we offer price matching on identical products from major authorized retailers. Please contact our customer service with details of the competitor\'s price within 14 days of purchase to request a price match.'
    },
    {
      id: 'faq-8',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. Financing options are available for qualifying purchases over $100.'
    },
  ];

  // Shipping information content
  const shippingInfo = {
    domesticOptions: [
      { name: 'Standard Shipping', time: '3-5 business days', cost: 'Free for orders over $35, otherwise $4.99' },
      { name: 'Express Shipping', time: '2 business days', cost: '$9.99' },
      { name: 'Next Day Shipping', time: '1 business day', cost: '$19.99' },
    ],
    internationalOptions: [
      { name: 'Standard International', time: '7-14 business days', cost: 'Starting at $14.99, varies by location' },
      { name: 'Express International', time: '3-5 business days', cost: 'Starting at $29.99, varies by location' },
    ],
    additionalInfo: [
      'All orders are processed within 1-2 business days.',
      'Shipping times do not include processing time.',
      'Business days are Monday-Friday, excluding holidays.',
      'Tracking information is provided for all shipments.',
      'International customers are responsible for any import duties and taxes.',
    ]
  };

  // Returns policy content
  const returnsInfo = {
    generalPolicy: 'We offer a 30-day return window for most products in new, unused condition with original packaging and accessories.',
    exceptions: [
      'Earbuds and headphones: 14-day return policy for hygiene reasons',
      'Sale items: May have limited return eligibility as noted during purchase',
      'Custom or personalized items are not eligible for return',
    ],
    process: [
      'Initiate your return through your account or contact customer support',
      'You\'ll receive a return shipping label via email',
      'Package your return securely with all original materials',
      'Drop off at any authorized shipping location',
      'Refunds are processed within 5-7 business days after we receive the return',
    ],
    refundOptions: [
      'Original payment method refund',
      'Store credit (with 10% bonus value)',
      'Exchange for another product',
    ]
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Page header */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-600 py-16">
        <div className="absolute inset-0 bg-blue-900 opacity-10 pattern-grid-lg"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Customer Support
            </h1>
            <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
              We're here to help with any questions or concerns about our products and services.
            </p>
          </div>
        </div>
      </div>

      {/* Invisible anchor elements for navigation from other pages */}
      <div id="faq" className="invisible h-0"></div>
      <div id="shipping" className="invisible h-0"></div>
      <div id="returns" className="invisible h-0"></div>
      <div id="terms" className="invisible h-0"></div>
      <div id="privacy" className="invisible h-0"></div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="flex justify-start mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 text-sm font-medium rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-50"
            aria-label="Go back"
          >
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
        {/* Support category navigation */}
        <div className="mb-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 shadow'
                }`}
              >
                <span className={`p-2 rounded-full ${
                  activeCategory === category.id
                    ? 'bg-blue-500'
                    : 'bg-blue-100'
                } mb-2`}>
                  {category.icon}
                </span>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic content based on active category */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* FAQ Section */}
          {activeCategory === 'faq' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center focus:outline-none"
                    >
                      <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                      <svg 
                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                          expandedFaqs[faq.id] ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedFaqs[faq.id] ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="p-6 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-gray-600">Can't find what you're looking for?</p>
                <button 
                  onClick={() => setActiveCategory('contact')}
                  className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  Contact our support team
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Contact Us Section */}
          {activeCategory === 'contact' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact Methods */}
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-blue-50 p-5 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Support</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Email Us</p>
                          <p className="text-sm text-gray-600">support@devicegalleryhub.com</p>
                          <p className="mt-1 text-xs text-gray-500">We'll respond within 24 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Phone Support</p>
                          <p className="text-sm text-gray-600">1-800-DEVICES</p>
                          <p className="mt-1 text-xs text-gray-500">Mon-Fri, 9 AM - 6 PM EST</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Live Chat</p>
                          <p className="text-sm text-gray-600">Chat with our specialists</p>
                          <p className="mt-1 text-xs text-gray-500">Available 24/7</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Business Hours</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Monday - Friday:</span>
                        <span className="font-medium text-gray-900">9:00 AM - 8:00 PM EST</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Saturday:</span>
                        <span className="font-medium text-gray-900">10:00 AM - 6:00 PM EST</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Sunday:</span>
                        <span className="font-medium text-gray-900">11:00 AM - 5:00 PM EST</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div className="md:col-span-2">
                  {ticketSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <svg className="h-12 w-12 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="mt-4 text-lg font-medium text-gray-900">Thank you for contacting us!</h3>
                      <p className="mt-2 text-gray-600">We've received your message and will get back to you as soon as possible.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formValues.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
                            Order Number (if applicable)
                          </label>
                          <input
                            type="text"
                            id="orderNumber"
                            name="orderNumber"
                            value={formValues.orderNumber}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="issueType" className="block text-sm font-medium text-gray-700">
                            Issue Type
                          </label>
                          <select
                            id="issueType"
                            name="issueType"
                            value={formValues.issueType}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option value="general-inquiry">General Inquiry</option>
                            <option value="order-status">Order Status</option>
                            <option value="return-request">Return Request</option>
                            <option value="technical-support">Technical Support</option>
                            <option value="product-question">Product Question</option>
                            <option value="billing-issue">Billing Issue</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formValues.message}
                          onChange={handleInputChange}
                          rows={5}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="text-right">
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Submit Request
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Shipping Information */}
          {activeCategory === 'shipping' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
              
              <div className="space-y-8">
                {/* Domestic Shipping */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Domestic Shipping</h3>
                  <div className="bg-white shadow overflow-hidden rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Shipping Method
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estimated Delivery Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cost
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {shippingInfo.domesticOptions.map((option, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {option.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {option.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {option.cost}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* International Shipping */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">International Shipping</h3>
                  <div className="bg-white shadow overflow-hidden rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Shipping Method
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estimated Delivery Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cost
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {shippingInfo.internationalOptions.map((option, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {option.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {option.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {option.cost}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Additional Information */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {shippingInfo.additionalInfo.map((info, index) => (
                      <li key={index}>{info}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Returns & Refunds */}
          {activeCategory === 'returns' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Returns & Refunds</h2>
              
              <div className="space-y-8">
                {/* General Policy */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Return Policy</h3>
                  <p className="text-gray-700 mb-4">{returnsInfo.generalPolicy}</p>
                </div>
                
                {/* Policy Exceptions */}
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Exceptions & Special Conditions</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {returnsInfo.exceptions.map((exception, index) => (
                      <li key={index}>{exception}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Return Process */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Return Process</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {returnsInfo.process.map((step, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow">
                        <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center mb-3">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-600">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Refund Options */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Refund Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {returnsInfo.refundOptions.map((option, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg shadow text-center border-t-4 border-blue-500">
                        <p className="font-medium text-gray-800">{option}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Need Help with a Return?</h3>
                  <p className="text-gray-600 mb-4">
                    Our customer service team is ready to assist you with any questions about returns or refunds.
                  </p>
                  <button 
                    onClick={() => setActiveCategory('contact')}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Contact support
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Terms of Service */}
          {activeCategory === 'terms' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Terms of Service</h2>
              
              <div className="prose max-w-none text-gray-700">
                <p>Last updated: June 1, 2025</p>
                
                <h3>1. Introduction</h3>
                <p>
                  Welcome to Device Gallery Hub. By accessing our website, you agree to these Terms of Service. 
                  Please read them carefully. If you do not agree with these terms, please do not use our services.
                </p>
                
                <h3>2. Using Our Services</h3>
                <p>
                  You must follow any policies made available to you within the Services. You may use our Services 
                  only as permitted by law. We may suspend or stop providing our Services to you if you do not 
                  comply with our terms or policies or if we are investigating suspected misconduct.
                </p>
                
                <h3>3. Your Device Gallery Hub Account</h3>
                <p>
                  To use some of our services, you may need to create an account. You are responsible for the 
                  activity that happens on or through your account. We recommend creating a strong password and 
                  keeping it confidential.
                </p>
                
                <h3>4. Privacy & Copyright Protection</h3>
                <p>
                  Our privacy policy explains how we treat your personal data and protect your privacy when you 
                  use our Services. By using our Services, you agree that Device Gallery Hub can use such data in 
                  accordance with our privacy policies.
                </p>
                
                <h3>5. Your Content in Our Services</h3>
                <p>
                  Our Services allow you to upload, submit, store, send or receive content. You retain ownership 
                  of any intellectual property rights that you hold in that content.
                </p>
                
                <h3>6. Software in Our Services</h3>
                <p>
                  Device Gallery Hub gives you a personal, worldwide, royalty-free, non-assignable and non-exclusive 
                  license to use the software provided to you as part of the Services. You may not copy, modify, 
                  distribute, sell, or lease any part of our Services or included software.
                </p>
                
                <h3>7. Modifying & Terminating Our Services</h3>
                <p>
                  We are constantly changing and improving our Services. We may add or remove functionalities or 
                  features, and we may suspend or stop a Service altogether. You can stop using our Services at 
                  any time, although we'll be sorry to see you go.
                </p>
                
                <h3>8. Our Warranties & Disclaimers</h3>
                <p>
                  We provide our Services using a commercially reasonable level of skill and care. But there are 
                  certain things that we don't promise about our Services.
                </p>
                
                <h3>9. Liability for Our Services</h3>
                <p>
                  When permitted by law, Device Gallery Hub, and Device Gallery Hub's suppliers and distributors, 
                  will not be responsible for lost profits, revenues, or data, financial losses or indirect, 
                  special, consequential, exemplary, or punitive damages.
                </p>
                
                <h3>10. About These Terms</h3>
                <p>
                  We may modify these terms or any additional terms that apply to a Service to, for example, 
                  reflect changes to the law or changes to our Services. We'll post notice of modifications to 
                  these terms on this page. We'll post notice of modified additional terms in the applicable 
                  Service. Changes will not apply retroactively and will become effective 30 days after they 
                  are posted.
                </p>
              </div>
            </div>
          )}

          {/* Privacy Policy */}
          {activeCategory === 'privacy' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Privacy Policy</h2>
              
              <div className="prose max-w-none text-gray-700">
                <p>Last updated: June 1, 2025</p>
                
                <h3>1. Introduction</h3>
                <p>
                  This Privacy Policy describes how Device Gallery Hub ("we," "us," or "our") collects, uses, 
                  and discloses your personal information when you visit our website, make a purchase, or interact 
                  with us in any other way.
                </p>
                
                <h3>2. Information We Collect</h3>
                <p>We collect several types of information from and about users of our Website, including:</p>
                <ul>
                  <li>Personal information (such as name, email address, postal address, phone number)</li>
                  <li>Order information (such as products purchased, shipping details, payment information)</li>
                  <li>Technical information (such as IP address, browser type, device information)</li>
                  <li>Usage information (such as pages visited, time spent on the website)</li>
                </ul>
                
                <h3>3. How We Use Your Information</h3>
                <p>We use the information we collect for various purposes, including to:</p>
                <ul>
                  <li>Process and fulfill your orders</li>
                  <li>Provide customer support</li>
                  <li>Send you order confirmations, updates, and marketing communications</li>
                  <li>Improve our website and products</li>
                  <li>Detect and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
                
                <h3>4. How We Share Your Information</h3>
                <p>
                  We may share your personal information with service providers who help us with our business 
                  activities, such as payment processors, shipping carriers, and marketing services. We may also 
                  share your information as required by law or in connection with a business transaction such as 
                  a merger or acquisition.
                </p>
                
                <h3>5. Your Choices</h3>
                <p>You have certain choices about how we use your information:</p>
                <ul>
                  <li>You can opt out of receiving marketing emails</li>
                  <li>You can update or correct your account information</li>
                  <li>You can request access to, deletion of, or restriction on the use of your personal information</li>
                  <li>You can disable cookies through your browser settings</li>
                </ul>
                
                <h3>6. Security</h3>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information 
                  against unauthorized access, loss, or misuse. However, no method of transmission over the Internet 
                  or electronic storage is 100% secure.
                </p>
                
                <h3>7. Children's Privacy</h3>
                <p>
                  Our website is not intended for children under the age of 13, and we do not knowingly collect 
                  personal information from children under 13.
                </p>
                
                <h3>8. International Transfers</h3>
                <p>
                  Your information may be transferred to, and processed in, countries other than the country in 
                  which you are a resident. These countries may have data protection laws that are different from 
                  the laws of your country.
                </p>
                
                <h3>9. Changes to This Privacy Policy</h3>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
                
                <h3>10. Contact Us</h3>
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at 
                  privacy@devicegalleryhub.com.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Help center promotion */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 md:p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-white opacity-10"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 rounded-full bg-white opacity-10"></div>
          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between">
              <div className="w-full md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold">Need additional help?</h2>
                <p className="mt-2 text-blue-100">
                  Our comprehensive help center has guides, tutorials, and answers to common questions.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <Link
                  to="/help-center"
                  className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Visit Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
