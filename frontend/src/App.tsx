import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/home/HomePage';
import ProductsPage from './pages/products/ProductsPage';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderSuccessPage from './pages/order/OrderSuccessPage';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import { CategoriesPage, CategoryPage } from './pages/categories';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

function App() {
  useEffect(() => {
    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            // Only log in development
            if (process.env.NODE_ENV === 'development') {
              console.log('SW registered: ', registration);
            }
          })
          .catch((registrationError) => {
            // Only log in development
            if (process.env.NODE_ENV === 'development') {
              console.error('SW registration failed: ', registrationError);
            }
          });
      });
    }

    // Suppress common console warnings in production
    if (process.env.NODE_ENV === 'production') {
      // Override console methods to prevent warnings from appearing in production
      const originalWarn = console.warn;
      const originalError = console.error;

      console.warn = (...args) => {
        // Filter out known harmless warnings
        const message = args.join(' ');
        if (
          message.includes('React Router Future Flag Warning') ||
          message.includes('defaultProps') ||
          message.includes('componentWillReceiveProps')
        ) {
          return;
        }
        originalWarn.apply(console, args);
      };

      console.error = (...args) => {
        // Filter out known harmless errors
        const message = args.join(' ');
        if (
          message.includes('ResizeObserver loop limit exceeded') ||
          message.includes('Non-passive event listener')
        ) {
          return;
        }
        originalError.apply(console, args);
      };
    }
  }, []);

  return (
    <ErrorBoundary>
      <CartProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
              <Route path="/products/:id" element={<div>Product Detail Page - Coming Soon</div>} />
              <Route path="/orders" element={<div>Orders Page - Coming Soon</div>} />
              <Route path="/admin" element={<div>Admin Portal - Coming Soon</div>} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
