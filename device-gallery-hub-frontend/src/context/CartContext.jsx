import { createContext, useContext, useState, useEffect } from 'react';
import cable1Img from '../assets/images/products/cable1.jpg';
import earbuds1Img from '../assets/images/products/earbuds1.jpg';
import powerbank1Img from '../assets/images/products/powerbank1.jpg';

// Create the cart context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCartItems([]);
      }
    } else {
      // Mock data for development purposes
      // In a real app, this would be empty initially and only populated by user actions
      setCartItems([
        {
          id: 101,
          name: 'Next Gen Type-C Fast Charging Cable',
          price: 16.99,
          oldPrice: 21.99,
          discount: 22,
          quantity: 1,
          subcategory: 'Type-C',
          image: cable1Img,
        },
        {
          id: 103,
          name: 'Wireless Earbuds Pro Max',
          price: 89.99,
          oldPrice: 119.99,
          discount: 25,
          quantity: 2,
          subcategory: 'Earbuds',
          image: earbuds1Img,
        },
        {
          id: 105,
          name: '25000mAh Power Bank with PD',
          price: 49.99,
          oldPrice: 69.99,
          discount: 28,
          quantity: 1,
          subcategory: 'Power Banks',
          image: powerbank1Img,
        }
      ]);
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    // Ensure the image is using the local image object, not a string path
    let processedProduct = { ...product };
    
    // If the image is a string URL, try to replace with local image
    if (typeof product.image === 'string') {
      // This is a simple mapping - in a real app you'd have a more comprehensive approach
      try {
        import(`../assets/images/products/${product.id}.jpg`).then(img => {
          processedProduct.image = img.default;
        }).catch(() => {
          // If specific product image can't be found, use a fallback based on category
          if (product.category?.toLowerCase().includes('cable')) {
            processedProduct.image = cable1Img;
          } else if (product.category?.toLowerCase().includes('earbuds') || 
                     product.category?.toLowerCase().includes('audio')) {
            processedProduct.image = earbuds1Img;
          } else if (product.category?.toLowerCase().includes('power')) {
            processedProduct.image = powerbank1Img;
          }
        });
      } catch (error) {
        console.warn('Error processing product image:', error);
      }
    }
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { ...processedProduct, quantity }];
      }
    });
    
    // Open the cart notification panel
    setIsCartOpen(true);
    
    // Optional: Auto-close after a few seconds
    setTimeout(() => {
      setIsCartOpen(false);
    }, 4000);
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== itemId)
    );
    
    // If cart is empty after removal, clean localStorage
    if (cartItems.length === 1) {
      localStorage.removeItem('cart');
    }
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // Toggle cart dropdown visibility
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // Close cart dropdown
  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Calculate total quantity of items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate subtotal price
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Value to be provided by context
  const value = {
    cartItems,
    isCartOpen,
    totalItems,
    subtotal,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    toggleCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
