import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SimpleHome from './pages/home/SimpleHome';
import ProductsPage from './pages/products/ProductsPage';
import CartPage from './pages/cart/CartPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SimpleHome />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* TODO: Add more routes */}
          <Route path="/products/:id" element={<div>Product Detail Page - Coming Soon</div>} />
          <Route path="/categories/:slug" element={<div>Category Page - Coming Soon</div>} />
          <Route path="/checkout" element={<div>Checkout Page - Coming Soon</div>} />
          <Route path="/admin" element={<div>Admin Portal - Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
