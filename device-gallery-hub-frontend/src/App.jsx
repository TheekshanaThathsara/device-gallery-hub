import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import CategorySection from './components/home/CategorySection';
import FeaturedProducts from './components/home/FeaturedProducts';
import Testimonials from './components/home/Testimonials';
import Newsletter from './components/home/Newsletter';
import Footer from './components/layout/Footer';
import ProductListingPage from './components/shop/ProductListingPage';
import ProductDetailsPage from './components/product/ProductDetailsPage';
import CartPage from './components/cart/CartPage';
import Dashboard from './components/admin/Dashboard';
import AdminHome from './components/admin/AdminHome';
import ProductsManagement from './components/admin/ProductsManagement';
import ProductForm from './components/admin/ProductForm';
import OrdersManagement from './components/admin/OrdersManagement';
import InventoryManagement from './components/admin/InventoryManagement';
import NewArrivalsPage from './components/shop/NewArrivalsPage';
import DealsPage from './components/shop/DealsPage';
import SupportPage from './components/support/SupportPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import UserProfilePage from './components/user/UserProfilePage';
import ScrollToTop from './components/utils/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ScrollToTop component ensures page starts from top on navigation */}
      <ScrollToTop />
      
      {/* Regular Store Routes */}
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <main>
              <Hero />
              <CategorySection />
              <FeaturedProducts />
              <Testimonials />
              <Newsletter />
            </main>
            <Footer />
          </>
        } />
        <Route path="/shop" element={
          <>
            <Navbar />
            <main>
              <ProductListingPage />
            </main>
            <Footer />
          </>
        } />
        <Route path="/new-arrivals" element={
          <>
            <Navbar />
            <main className="pt-20"> {/* Added padding-top to account for fixed navbar */}
              <NewArrivalsPage />
            </main>
            <Footer />
          </>
        } />
        <Route path="/deals" element={
          <>
            <Navbar />
            <main className="pt-20"> {/* Added padding-top to account for fixed navbar */}
              <DealsPage />
            </main>
            <Footer />
          </>
        } />
        <Route path="/support" element={
          <>
            <Navbar />
            <main className="pt-20"> {/* Added padding-top to account for fixed navbar */}
              <SupportPage />
            </main>
            <Footer />
          </>
        } />
        <Route path="/product/:productId" element={
          <>
            <Navbar />
            <main>
              <ProductDetailsPage />
            </main>
            <Footer />
          </>
        } />
        <Route path="/cart" element={
          <>
            <Navbar />
            <main>
              <CartPage />
            </main>
            <Footer />
          </>
        } />
        <Route path="/checkout" element={
          <>
            <Navbar />
            <main className="pt-20"> {/* Added padding-top to account for fixed navbar */}
              <CheckoutPage />
            </main>
            <Footer />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Navbar />
            <main className="pt-20"> {/* Added padding-top to account for fixed navbar */}
              <UserProfilePage />
            </main>
            <Footer />
          </>
        } />

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<Dashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="products/:productId" element={<ProductForm />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="inventory" element={<InventoryManagement />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
