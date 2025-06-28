import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HelpCenterPage() {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Help categories
  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'account',
      name: 'Account Help',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'products',
      name: 'Products & Compatibility',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      id: 'orders',
      name: 'Orders & Shipping',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      )
    },
    {
      id: 'troubleshooting',
      name: 'Troubleshooting',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
    }
  ];

  // Help guides data
  const helpGuides = [
    {
      id: 'guide-1',
      category: 'getting-started',
      title: 'How to Create an Account',
      summary: 'Learn how to create and set up your Device Gallery Hub account.',
      content: `
        <h2>Creating Your Account</h2>
        <p>Follow these simple steps to create your Device Gallery Hub account:</p>
        <ol>
          <li>Click the "Account" icon in the top-right corner of any page</li>
          <li>Select "Create Account" from the dropdown menu</li>
          <li>Enter your email address, create a password, and fill in your name</li>
          <li>Click the "Create Account" button</li>
          <li>Check your email for a verification link and click it to activate your account</li>
        </ol>
        <p>Once your account is created, you can:</p>
        <ul>
          <li>Save your shipping and payment information for faster checkout</li>
          <li>Track your orders</li>
          <li>Create wishlists for products you're interested in</li>
          <li>Receive personalized recommendations</li>
          <li>Access exclusive deals and promotions</li>
        </ul>
      `
    },
    {
      id: 'guide-2',
      category: 'getting-started',
      title: 'Navigating Our Website',
      summary: 'Get familiar with our website layout and features.',
      content: `
        <h2>Website Navigation Guide</h2>
        <p>Our website is designed to be intuitive and easy to navigate. Here's a quick overview of our main sections:</p>
        
        <h3>Main Navigation</h3>
        <ul>
          <li><strong>Home:</strong> Our landing page featuring the latest products and promotions</li>
          <li><strong>Shop:</strong> Browse our complete product catalog</li>
          <li><strong>New Arrivals:</strong> Check out our newest products</li>
          <li><strong>Deals:</strong> Find special offers and discounted items</li>
          <li><strong>Support:</strong> Access customer support resources</li>
        </ul>
        
        <h3>Your Account</h3>
        <p>Click the account icon in the top-right corner to:</p>
        <ul>
          <li>Log in or create an account</li>
          <li>View your profile</li>
          <li>Check your order history</li>
          <li>Manage your wishlist</li>
          <li>Update your payment methods</li>
        </ul>
        
        <h3>Product Categories</h3>
        <p>Our products are organized into easy-to-browse categories:</p>
        <ul>
          <li>Cables (USB, Type-C, Lightning)</li>
          <li>Chargers (Wall, Wireless, Car)</li>
          <li>Power Banks</li>
          <li>Earbuds & Headphones</li>
          <li>Handsfree Devices</li>
          <li>And more!</li>
        </ul>
      `
    },
    {
      id: 'guide-3',
      category: 'account',
      title: 'Managing Your Profile Information',
      summary: 'Learn how to update your personal details and preferences.',
      content: `
        <h2>Managing Your Profile</h2>
        <p>Keeping your profile information up-to-date ensures a smooth shopping experience. Here's how to manage your profile:</p>
        
        <h3>Accessing Your Profile</h3>
        <ol>
          <li>Click the account icon in the top-right corner</li>
          <li>Select "Profile" from the dropdown menu (if you're logged in) or log in first</li>
          <li>You'll be taken to your profile dashboard</li>
        </ol>
        
        <h3>Updating Personal Information</h3>
        <ol>
          <li>On your profile page, click the "Personal Information" tab</li>
          <li>Click "Edit" to modify your name, email, phone number, or date of birth</li>
          <li>Make your changes and click "Save"</li>
        </ol>
        
        <h3>Changing Your Password</h3>
        <ol>
          <li>Go to the "Security" tab in your profile</li>
          <li>Click "Change Password"</li>
          <li>Enter your current password and your new password</li>
          <li>Confirm your new password and click "Update Password"</li>
        </ol>
        
        <h3>Communication Preferences</h3>
        <p>You can also manage your email preferences:</p>
        <ol>
          <li>Go to the "Communication Preferences" tab</li>
          <li>Select which types of emails you want to receive (order updates, promotions, product recommendations, etc.)</li>
          <li>Click "Save Preferences"</li>
        </ol>
      `
    },
    {
      id: 'guide-4',
      category: 'account',
      title: 'Setting Up Payment Methods',
      summary: 'Add and manage your payment options for faster checkout.',
      content: `
        <h2>Payment Methods Management</h2>
        <p>Setting up your payment methods in advance makes checkout faster and more convenient. Here's how to add and manage payment methods:</p>
        
        <h3>Adding a New Payment Method</h3>
        <ol>
          <li>Go to your account by clicking the account icon in the top-right corner</li>
          <li>Click on "Payment Methods" in your profile menu</li>
          <li>Select "Add New Payment Method"</li>
          <li>Choose the payment type (credit/debit card, PayPal, etc.)</li>
          <li>Enter the required information</li>
          <li>Click "Save" to store your payment method securely</li>
        </ol>
        
        <h3>Setting a Default Payment Method</h3>
        <ol>
          <li>On the Payment Methods page, find the payment method you want to set as default</li>
          <li>Click "Set as Default" next to that payment method</li>
          <li>This payment method will now be selected automatically during checkout</li>
        </ol>
        
        <h3>Removing a Payment Method</h3>
        <ol>
          <li>On the Payment Methods page, find the payment method you want to remove</li>
          <li>Click "Remove" next to that payment method</li>
          <li>Confirm your decision when prompted</li>
        </ol>
        
        <h3>Security Information</h3>
        <p>Device Gallery Hub uses industry-standard encryption to protect your payment information. We never store complete credit card numbers on our servers.</p>
      `
    },
    {
      id: 'guide-5',
      category: 'products',
      title: 'Understanding Product Compatibility',
      summary: 'Make sure you purchase the right accessories for your devices.',
      content: `
        <h2>Device Compatibility Guide</h2>
        <p>Ensuring you purchase accessories that work with your devices is essential. Here's how to check compatibility:</p>
        
        <h3>Reading Compatibility Information</h3>
        <p>Every product page includes detailed compatibility information:</p>
        <ul>
          <li>Look for the "Compatibility" section on product pages</li>
          <li>Check for specific device models listed</li>
          <li>Note any warnings or special requirements</li>
        </ul>
        
        <h3>Chargers & Power Banks</h3>
        <p>When purchasing chargers or power banks, pay attention to:</p>
        <ul>
          <li><strong>Output Power:</strong> Measured in watts (W), this determines charging speed</li>
          <li><strong>Connector Type:</strong> USB-A, USB-C, Lightning, etc.</li>
          <li><strong>Fast Charging Protocols:</strong> QC (Quick Charge), PD (Power Delivery), etc.</li>
          <li><strong>Device Compatibility:</strong> Some devices require specific charging standards</li>
        </ul>
        
        <h3>Cables</h3>
        <p>For cables, consider:</p>
        <ul>
          <li><strong>Connector Types:</strong> USB-A, USB-C, Lightning, Micro USB, etc.</li>
          <li><strong>Cable Length:</strong> Available in various lengths for different needs</li>
          <li><strong>Data Transfer Speed:</strong> Important if you transfer files between devices</li>
          <li><strong>Power Rating:</strong> Higher wattage cables support faster charging</li>
        </ul>
        
        <h3>Audio Products</h3>
        <p>For earbuds, headphones, and handsfree devices:</p>
        <ul>
          <li><strong>Connection Type:</strong> Wired (3.5mm jack, Lightning, USB-C) or wireless (Bluetooth)</li>
          <li><strong>Bluetooth Version:</strong> Newer versions offer better connection stability and range</li>
          <li><strong>Device OS Compatibility:</strong> Some features may be limited to specific operating systems</li>
        </ul>
        
        <h3>Use Our Compatibility Tool</h3>
        <p>For the most accurate compatibility check:</p>
        <ol>
          <li>Go to our "Compatibility Checker" tool in the Help Center</li>
          <li>Enter your device make and model</li>
          <li>View a list of all compatible accessories</li>
        </ol>
      `
    },
    {
      id: 'guide-6',
      category: 'products',
      title: 'Product Specifications Explained',
      summary: 'Understand technical specifications to make informed purchases.',
      content: `
        <h2>Understanding Product Specifications</h2>
        <p>Technical specifications can seem confusing, but understanding them helps you make better purchasing decisions. Here's a breakdown of common specifications:</p>
        
        <h3>Power-Related Specifications</h3>
        <ul>
          <li><strong>Wattage (W):</strong> Indicates power output/input capacity. Higher wattage generally means faster charging.</li>
          <li><strong>Amperage (A):</strong> Measures electrical current. Higher amperage typically allows for faster charging.</li>
          <li><strong>Voltage (V):</strong> Standard voltage for USB is 5V, but fast charging can use higher voltages.</li>
          <li><strong>mAh (Milliamp Hours):</strong> Used for power banks and batteries to indicate capacity. Higher mAh means more charge cycles.</li>
        </ul>
        
        <h3>Cable Specifications</h3>
        <ul>
          <li><strong>Data Transfer Rate:</strong> Measured in Mbps (Megabits per second) or Gbps (Gigabits per second).</li>
          <li><strong>AWG (American Wire Gauge):</strong> Indicates wire thickness. Lower AWG numbers mean thicker wires that can handle more power.</li>
          <li><strong>Shielding:</strong> Reduces interference. Options include unshielded, foil shielded, and braided shielding.</li>
          <li><strong>Connector Plating:</strong> Gold-plated connectors offer better conductivity and corrosion resistance.</li>
        </ul>
        
        <h3>Audio Product Specifications</h3>
        <ul>
          <li><strong>Driver Size:</strong> Measured in mm. Larger drivers can produce stronger bass but aren't always better.</li>
          <li><strong>Frequency Response:</strong> The range of sound frequencies (Hz to kHz) the device can reproduce.</li>
          <li><strong>Impedance:</strong> Measured in ohms (Ω). Lower impedance headphones are easier to drive with mobile devices.</li>
          <li><strong>Noise Isolation/Cancellation:</strong> Passive isolation blocks sound physically; active cancellation uses technology to reduce noise.</li>
        </ul>
        
        <h3>Connector Types</h3>
        <ul>
          <li><strong>USB-A:</strong> The traditional rectangular USB connector.</li>
          <li><strong>USB-C:</strong> Newer, reversible connector used in many modern devices.</li>
          <li><strong>Lightning:</strong> Apple's proprietary connector for iOS devices.</li>
          <li><strong>Micro USB:</strong> Older standard still used in some devices.</li>
          <li><strong>3.5mm Audio Jack:</strong> Standard headphone connector.</li>
        </ul>
      `
    },
    {
      id: 'guide-7',
      category: 'orders',
      title: 'Placing Your First Order',
      summary: 'A step-by-step guide to completing your purchase.',
      content: `
        <h2>How to Place an Order</h2>
        <p>Ready to make your first purchase? Follow these simple steps:</p>
        
        <h3>Shopping Process</h3>
        <ol>
          <li><strong>Find Products:</strong> Browse categories, use the search function, or check out featured products on our homepage.</li>
          <li><strong>Product Selection:</strong> Click on a product to view its details, specifications, compatibility, and customer reviews.</li>
          <li><strong>Add to Cart:</strong> Once you've found what you want, click "Add to Cart." You can adjust the quantity as needed.</li>
          <li><strong>Review Your Cart:</strong> Click the cart icon to review your selections. You can remove items or change quantities here.</li>
          <li><strong>Proceed to Checkout:</strong> Click "Checkout" when you're ready to complete your purchase.</li>
        </ol>
        
        <h3>Checkout Process</h3>
        <ol>
          <li><strong>Sign In:</strong> Log in to your account or continue as a guest (though creating an account offers many benefits).</li>
          <li><strong>Shipping Address:</strong> Enter your shipping address or select a saved address.</li>
          <li><strong>Shipping Method:</strong> Choose your preferred shipping option (standard, express, etc.).</li>
          <li><strong>Payment:</strong> Enter your payment details or select a saved payment method.</li>
          <li><strong>Review Order:</strong> Double-check your items, shipping address, and payment information.</li>
          <li><strong>Place Order:</strong> Click "Place Order" to complete your purchase.</li>
        </ol>
        
        <h3>After Placing Your Order</h3>
        <ul>
          <li>You'll receive an order confirmation email with your order number.</li>
          <li>You can track your order status in your account under "Order History."</li>
          <li>You'll receive shipping confirmation with tracking information once your order ships.</li>
        </ul>
        
        <h3>Payment Options</h3>
        <p>We accept multiple payment methods:</p>
        <ul>
          <li>Credit/debit cards (Visa, MasterCard, American Express, Discover)</li>
          <li>PayPal</li>
          <li>Apple Pay</li>
          <li>Google Pay</li>
          <li>Shop Pay</li>
        </ul>
      `
    },
    {
      id: 'guide-8',
      category: 'orders',
      title: 'Tracking Your Order',
      summary: 'How to check the status of your shipment.',
      content: `
        <h2>Order Tracking Guide</h2>
        <p>Stay informed about your order's journey from our warehouse to your doorstep with our tracking tools:</p>
        
        <h3>Tracking Through Your Account</h3>
        <ol>
          <li>Log in to your Device Gallery Hub account</li>
          <li>Click on "Order History" in your account menu</li>
          <li>Find your order in the list and click "Track Order"</li>
          <li>You'll see the current status and location of your package</li>
        </ol>
        
        <h3>Tracking via Email</h3>
        <ol>
          <li>Open the shipping confirmation email we sent when your order shipped</li>
          <li>Click the tracking link in the email</li>
          <li>You'll be redirected to the carrier's website with your tracking information</li>
        </ol>
        
        <h3>Understanding Order Statuses</h3>
        <ul>
          <li><strong>Order Placed:</strong> We've received your order</li>
          <li><strong>Processing:</strong> Your order is being prepared for shipping</li>
          <li><strong>Shipped:</strong> Your order is on its way to you</li>
          <li><strong>Out for Delivery:</strong> Your package is on the delivery vehicle</li>
          <li><strong>Delivered:</strong> Your package has been delivered</li>
        </ul>
        
        <h3>Estimated Delivery Times</h3>
        <p>Standard shipping typically takes:</p>
        <ul>
          <li>Domestic: 3-5 business days</li>
          <li>International: 7-14 business days</li>
        </ul>
        <p>Express shipping options can reduce these times significantly. Business days are Monday through Friday, excluding holidays.</p>
        
        <h3>Delivery Issues</h3>
        <p>If your tracking shows "Delivered" but you haven't received your package:</p>
        <ol>
          <li>Check around your property, with neighbors, or at your mail room</li>
          <li>Wait 24 hours as sometimes delivery scans occur before actual delivery</li>
          <li>Contact our customer support if your package still hasn't arrived</li>
        </ol>
      `
    },
    {
      id: 'guide-9',
      category: 'troubleshooting',
      title: 'Common Charging Issues',
      summary: 'Troubleshooting tips for charging problems with your devices.',
      content: `
        <h2>Troubleshooting Charging Problems</h2>
        <p>Experiencing charging issues with your devices? Here are some common problems and solutions:</p>
        
        <h3>Device Charges Slowly or Not At All</h3>
        <p><strong>Possible causes and solutions:</strong></p>
        <ol>
          <li><strong>Cable Issues:</strong>
            <ul>
              <li>Try a different cable to rule out cable damage</li>
              <li>Check for debris in the connectors and clean if necessary</li>
              <li>Ensure the cable supports the proper charging protocol for your device</li>
            </ul>
          </li>
          <li><strong>Charger Problems:</strong>
            <ul>
              <li>Make sure you're using a charger with sufficient wattage for your device</li>
              <li>Try a different power outlet</li>
              <li>Check if the charger works with other devices</li>
            </ul>
          </li>
          <li><strong>Device Issues:</strong>
            <ul>
              <li>Restart your device</li>
              <li>Check for system updates</li>
              <li>Inspect the charging port for damage or debris</li>
              <li>If using a case, remove it to ensure it's not interfering with the connection</li>
            </ul>
          </li>
        </ol>
        
        <h3>Power Bank Not Charging Devices</h3>
        <p><strong>Troubleshooting steps:</strong></p>
        <ol>
          <li>Ensure the power bank itself is charged (check its indicator lights)</li>
          <li>Try pressing the power button on the power bank to activate charging</li>
          <li>Make sure you're using the correct output port (some power banks have different outputs for different devices)</li>
          <li>Check if your cable is compatible with both the power bank and your device</li>
          <li>Verify that your device falls within the power bank's output capabilities</li>
        </ol>
        
        <h3>Wireless Charger Not Working</h3>
        <p><strong>Try these solutions:</strong></p>
        <ol>
          <li>Ensure your device is properly aligned on the charging pad</li>
          <li>Remove any thick or metal cases that might interfere with charging</li>
          <li>Check that the charging pad is properly connected to a power source</li>
          <li>Verify that your device supports the wireless charging standard the charger uses</li>
          <li>Try a different wall adapter with sufficient power output</li>
        </ol>
        
        <h3>When to Contact Support</h3>
        <p>If you've tried the above solutions and are still experiencing issues:</p>
        <ul>
          <li>Contact our customer support team with your order number and product details</li>
          <li>Describe the troubleshooting steps you've already taken</li>
          <li>We may issue a replacement if the product is defective and still under warranty</li>
        </ul>
      `
    },
    {
      id: 'guide-10',
      category: 'troubleshooting',
      title: 'Audio Device Connectivity Issues',
      summary: 'Solutions for common problems with headphones and earbuds.',
      content: `
        <h2>Audio Device Troubleshooting</h2>
        <p>Having trouble with your audio devices? Here are solutions to common connectivity and sound issues:</p>
        
        <h3>Bluetooth Pairing Problems</h3>
        <p><strong>If your Bluetooth device won't pair or connect:</strong></p>
        <ol>
          <li><strong>Basic Bluetooth Troubleshooting:</strong>
            <ul>
              <li>Turn Bluetooth off and on again on your device</li>
              <li>Restart both your audio device and the device you're connecting to</li>
              <li>Make sure your audio device is in pairing mode (check the manual for specific instructions)</li>
              <li>Ensure your audio device is sufficiently charged</li>
            </ul>
          </li>
          <li><strong>Connection Issues:</strong>
            <ul>
              <li>Remove the device from your Bluetooth list and pair it again from scratch</li>
              <li>Check if your device is connected to another device (many can only connect to one device at a time)</li>
              <li>Move closer to the device you're trying to connect to (ideal range is within 30 feet/10 meters)</li>
              <li>Keep away from sources of interference (other wireless devices, microwaves, etc.)</li>
            </ul>
          </li>
        </ol>
        
        <h3>Sound Quality Issues</h3>
        <p><strong>If you're experiencing poor sound quality:</strong></p>
        <ol>
          <li>Check the audio settings on your device (equalizer settings, volume limitations)</li>
          <li>Ensure your earbuds/headphones fit properly for optimal sound</li>
          <li>Clean the speaker mesh or eartips to remove any debris</li>
          <li>For Bluetooth devices, move closer to the source device to improve signal quality</li>
          <li>Try a different audio source to determine if the problem is with your content</li>
        </ol>
        
        <h3>One Side Not Working</h3>
        <p><strong>If only one earbud or headphone speaker is working:</strong></p>
        <ol>
          <li>Check your device's audio balance settings to ensure they're centered</li>
          <li>For wired headphones, try rotating the connector to check for a loose connection</li>
          <li>Clean the connectors with a dry cloth or compressed air</li>
          <li>For wireless earbuds, try resetting both earbuds according to the manual</li>
          <li>Test with a different device to determine if the problem is with your audio device or the source</li>
        </ol>
        
        <h3>Microphone Not Working</h3>
        <p><strong>For headsets with built-in microphones:</strong></p>
        <ol>
          <li>Check your device's microphone permissions in settings</li>
          <li>Ensure the microphone isn't covered or blocked</li>
          <li>If the mic hole is small, carefully clean it with compressed air</li>
          <li>Test in a quiet environment to rule out background noise issues</li>
          <li>For mobile devices, try different apps to see if it's an app-specific issue</li>
        </ol>
        
        <h3>Product-Specific Troubleshooting</h3>
        <p>For more detailed instructions specific to your product, please:</p>
        <ul>
          <li>Refer to the product manual</li>
          <li>Check our product-specific support pages</li>
          <li>Contact customer support with your product model</li>
        </ul>
      `
    },
    {
      id: 'guide-11',
      category: 'returns',
      title: 'Initiating a Return',
      summary: 'How to return a product you\'re not satisfied with.',
      content: `
        <h2>Product Return Process</h2>
        <p>Not completely satisfied with your purchase? Our hassle-free return process makes it easy to return or exchange products:</p>
        
        <h3>Return Eligibility</h3>
        <p>Most products can be returned within 30 days of delivery if they are:</p>
        <ul>
          <li>In new, unused condition</li>
          <li>In original packaging with all accessories and tags</li>
          <li>Accompanied by the original receipt or order confirmation</li>
        </ul>
        
        <p><strong>Exceptions:</strong></p>
        <ul>
          <li>Earbuds and headphones have a 14-day return window for hygiene reasons</li>
          <li>Products marked as "Final Sale" cannot be returned</li>
          <li>Custom or personalized items are non-returnable</li>
          <li>Products with removed manufacturer seals may not be eligible for return</li>
        </ul>
        
        <h3>Starting a Return Through Your Account</h3>
        <ol>
          <li>Log in to your Device Gallery Hub account</li>
          <li>Go to "Order History"</li>
          <li>Find the order containing the item you wish to return</li>
          <li>Click "Return Items"</li>
          <li>Select the items you want to return and the reason for your return</li>
          <li>Choose your preferred refund method (original payment, store credit, or exchange)</li>
          <li>Follow the instructions to print your return shipping label</li>
        </ol>
        
        <h3>Return Shipping</h3>
        <p>To return your item(s):</p>
        <ol>
          <li>Pack the item(s) securely in the original packaging if possible</li>
          <li>Include all accessories, manuals, and parts that came with the product</li>
          <li>Place your return authorization form inside the package</li>
          <li>Attach the provided return shipping label to the outside of the package</li>
          <li>Drop off the package at the designated shipping carrier location</li>
          <li>Keep your tracking number and receipt for reference</li>
        </ol>
        
        <h3>Refund Processing</h3>
        <p>Once we receive your return:</p>
        <ul>
          <li>We'll inspect the item to ensure it meets return requirements</li>
          <li>You'll receive an email confirmation that your return was processed</li>
          <li>Refunds typically take 3-5 business days to appear on your original payment method</li>
          <li>Store credits are applied to your account immediately after processing</li>
          <li>Exchanges are processed and shipped within 1-2 business days</li>
        </ul>
      `
    },
    {
      id: 'guide-12',
      category: 'returns',
      title: 'Warranty Claims',
      summary: 'How to file a warranty claim for defective products.',
      content: `
        <h2>Warranty Claims Process</h2>
        <p>If your product develops a defect within the warranty period, you may be eligible for repair, replacement, or refund under our warranty policy:</p>
        
        <h3>Warranty Coverage</h3>
        <p>Our products come with the following warranty coverage:</p>
        <ul>
          <li><strong>Standard Warranty:</strong> 12 months from date of purchase for manufacturing defects</li>
          <li><strong>Extended Warranty:</strong> Available on select premium products (check product page for details)</li>
          <li><strong>Limited Lifetime Warranty:</strong> Offered on certain premium cables and adapters</li>
        </ul>
        
        <p><strong>What's Covered:</strong></p>
        <ul>
          <li>Manufacturing defects</li>
          <li>Premature failure under normal use</li>
          <li>Performance issues not caused by misuse</li>
        </ul>
        
        <p><strong>What's Not Covered:</strong></p>
        <ul>
          <li>Physical damage from drops, water exposure, etc.</li>
          <li>Normal wear and tear</li>
          <li>Damage from improper use, modifications, or unauthorized repairs</li>
          <li>Products with removed or altered serial numbers</li>
        </ul>
        
        <h3>Filing a Warranty Claim</h3>
        <ol>
          <li>Log in to your Device Gallery Hub account</li>
          <li>Go to "Order History" and find the order with the defective product</li>
          <li>Click "Report an Issue" or "Warranty Claim"</li>
          <li>Select the defective item and describe the problem in detail</li>
          <li>Upload photos or videos that demonstrate the issue if possible</li>
          <li>Submit your claim for review</li>
        </ol>
        
        <h3>Warranty Claim Review</h3>
        <p>After submitting your claim:</p>
        <ol>
          <li>Our warranty team will review your claim within 1-2 business days</li>
          <li>You may be asked to provide additional information or troubleshooting steps</li>
          <li>If approved, you'll receive instructions for returning the defective item</li>
          <li>For clear manufacturing defects, we may waive the return requirement</li>
        </ol>
        
        <h3>Resolution Options</h3>
        <p>Depending on the product, issue, and availability, we may offer:</p>
        <ul>
          <li>Product replacement (same model)</li>
          <li>Equivalent replacement (if original is discontinued)</li>
          <li>Repair (for select high-value items)</li>
          <li>Store credit or refund</li>
        </ul>
        
        <h3>Required Documentation</h3>
        <p>When filing a warranty claim, please have ready:</p>
        <ul>
          <li>Your order number or receipt</li>
          <li>Product serial number (if applicable)</li>
          <li>Date of purchase</li>
          <li>Detailed description of the defect</li>
          <li>Photos showing the issue (if visible)</li>
        </ul>
      `
    }
  ];

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    const results = helpGuides.filter(guide => 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredGuides(results);
    
    // Simulate loading
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  // Get guides for active category
  const activeCategoryGuides = helpGuides.filter(guide => guide.category === activeCategory);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Page header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="absolute inset-0 bg-blue-900 opacity-10 pattern-grid-lg"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Help Center
            </h1>
            <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
              Find guides and resources to help you get the most out of your devices and accessories.
            </p>
            
            {/* Search bar */}
            <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto flex">
              <div className="w-full relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for guides, FAQs, or topics..." 
                  className="w-full py-3 pl-12 pr-4 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute left-4 top-3.5">
                  <svg 
                    className="h-5 w-5 text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button 
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-6 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {searchQuery && isSearching ? (
          // Loading state for search
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        ) : searchQuery && filteredGuides.length > 0 ? (
          // Search results
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Search Results: <span className="text-blue-600">{filteredGuides.length} guides found</span>
              </h2>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Help Center
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <div key={guide.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {categories.find(cat => cat.id === guide.category)?.name}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{guide.title}</h3>
                    <p className="mt-2 text-gray-600">{guide.summary}</p>
                    <button 
                      onClick={() => {
                        setActiveCategory(guide.category);
                        setSearchQuery('');
                      }}
                      className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      Read Guide
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : searchQuery ? (
          // No search results
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-700">No guides found</h3>
            <p className="mt-2 text-gray-500">Try different search terms or browse our help categories.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 text-blue-600 hover:text-blue-800 font-medium flex items-center mx-auto"
            >
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Help Center
            </button>
          </div>
        ) : (
          // Default view - categories and guides
          <>
            {/* Help categories */}
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

            {/* Active category content */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {categories.find(cat => cat.id === activeCategory)?.name}
                </h2>
              </div>

              {/* Guides list */}
              <div className="space-y-6">
                {activeCategoryGuides.map((guide) => (
                  <div key={guide.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900">{guide.title}</h3>
                      <p className="mt-2 text-gray-600">{guide.summary}</p>
                      <div className="mt-4">
                        <div 
                          className="prose max-w-none text-gray-700"
                          dangerouslySetInnerHTML={{ __html: guide.content }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Contact support section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 md:p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-white opacity-10"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 rounded-full bg-white opacity-10"></div>
          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between">
              <div className="w-full md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold">Need more help?</h2>
                <p className="mt-2 text-blue-100">
                  Our customer support team is always ready to assist you with any questions or concerns.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <Link
                  to="/support"
                  className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
