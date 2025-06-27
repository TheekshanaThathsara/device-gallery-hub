
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import CategorySection from './components/home/CategorySection';
import Footer from './components/layout/Footer';
import ProductListingPage from './components/shop/ProductListingPage';

function App() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <CategorySection />
              </>
            }
          />
          <Route path="/shop" element={<ProductListingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
