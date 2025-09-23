import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import ProductsPage from './pages/products/ProductsPage';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderSuccessPage from './pages/order/OrderSuccessPage';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import { CategoriesPage, CategoryPage } from './pages/categories';
import { CartProvider } from './context/CartContext';
import './index.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:slug" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* TODO: Add more routes */}
            <Route path="/products/:id" element={<div>Product Detail Page - Coming Soon</div>} />
            <Route path="/orders" element={<div>Orders Page - Coming Soon</div>} />
            <Route path="/admin" element={<div>Admin Portal - Coming Soon</div>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
