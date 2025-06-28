import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component ensures the window scrolls to top when navigating
 * between routes. This component should be added once near the top of your
 * application component tree.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when the route changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use smooth scrolling for a better UX
    });
  }, [pathname]); // This effect runs whenever the pathname changes

  return null; // This component doesn't render anything
}