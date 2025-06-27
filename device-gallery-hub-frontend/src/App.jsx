
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import CategorySection from './components/home/CategorySection';
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

function App() {
  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Regular Store Routes */}
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <main>
              <Hero />
              <CategorySection />
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
