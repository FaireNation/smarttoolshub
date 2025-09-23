import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import ProductsPage from './pages/products/ProductsPage';
import CartPage from './pages/cart/CartPage';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import { CategoriesPage, CategoryPage } from './pages/categories';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:slug" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* TODO: Add more routes */}
          <Route path="/products/:id" element={<div>Product Detail Page - Coming Soon</div>} />
          <Route path="/checkout" element={<div>Checkout Page - Coming Soon</div>} />
          <Route path="/admin" element={<div>Admin Portal - Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
