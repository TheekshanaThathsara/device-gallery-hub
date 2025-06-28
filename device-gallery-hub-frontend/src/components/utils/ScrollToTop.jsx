import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that scrolls to the top of the page when the route changes
 * or to a specific section if a hash is present in the URL
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Handle the initial load and route changes
    const handleScroll = () => {
      // If there's a hash in the URL, scroll to that element
      if (hash) {
        // Give the DOM time to render and complete any transitions
        setTimeout(() => {
          const id = hash.replace('#', '');
          const element = document.getElementById(id);
          
          if (element) {
            // Scroll the element into view with smooth behavior
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
            
            // Add a focus state to the element for accessibility
            element.setAttribute('tabIndex', '-1');
            element.focus({ preventScroll: true });
          }
        }, 100); // Small delay for reliable rendering
      } else {
        // Otherwise scroll to top with smooth behavior
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    };

    handleScroll();
    
    // Cleanup function to remove focus
    return () => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.removeAttribute('tabIndex');
        }
      }
    };
  }, [pathname, hash]); // Re-run when pathname or hash changes

  return null; // This component doesn't render anything
}
