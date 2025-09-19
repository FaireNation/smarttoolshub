import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* TODO: Add more routes */}
          <Route path="/products" element={<div>Products Page - Coming Soon</div>} />
          <Route path="/products/:id" element={<div>Product Detail Page - Coming Soon</div>} />
          <Route path="/categories/:slug" element={<div>Category Page - Coming Soon</div>} />
          <Route path="/cart" element={<div>Cart Page - Coming Soon</div>} />
          <Route path="/checkout" element={<div>Checkout Page - Coming Soon</div>} />
          <Route path="/admin" element={<div>Admin Portal - Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
