import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModernHome from './pages/home/ModernHome';
import ModernProductsPage from './pages/products/ModernProductsPage';
import ModernCartPage from './pages/cart/ModernCartPage';
import ModernAboutPage from './pages/about';
import ModernContactPage from './pages/contact';
import { ModernCategoriesPage, ModernCategoryPage } from './pages/categories';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ModernHome />} />
          <Route path="/products" element={<ModernProductsPage />} />
          <Route path="/categories" element={<ModernCategoriesPage />} />
          <Route path="/categories/:slug" element={<ModernCategoryPage />} />
          <Route path="/cart" element={<ModernCartPage />} />
          <Route path="/about" element={<ModernAboutPage />} />
          <Route path="/contact" element={<ModernContactPage />} />
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
