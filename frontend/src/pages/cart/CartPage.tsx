import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Simple cart item type
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
}

const CartPage: React.FC = () => {
  // Sample cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'DEWALT 20V MAX Cordless Drill/Driver Kit',
      price: 89999,
      quantity: 1,
      image: '/api/placeholder/100/100',
      brand: 'DEWALT',
    },
    {
      id: '3',
      name: 'Stanley 25-Piece Screwdriver Set',
      price: 24999,
      quantity: 2,
      image: '/api/placeholder/100/100',
      brand: 'Stanley',
    },
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price / 100);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal >= 5000000 ? 0 : 500000; // Free shipping above ₦50,000
  const total = subtotal + shippingFee;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ST</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SmartTools Hub</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/products">
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
                  Continue Shopping
                </button>
              </Link>
              <Link to="/">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-gray-600">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
            <Link to="/products">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
                  
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🔧</span>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-lg font-bold text-blue-600">{formatPrice(item.price)}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 transition-colors"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className={`font-medium ${shippingFee === 0 ? 'text-green-600' : ''}`}>
                      {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                    </span>
                  </div>
                  {shippingFee === 0 && (
                    <p className="text-sm text-green-600">🎉 You qualify for free shipping!</p>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold text-blue-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-4">
                  Proceed to Checkout
                </button>

                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">💰 Pay on Delivery Available</div>
                  <div className="text-sm text-gray-600">🚚 Delivery across Nigeria</div>
                </div>

                {subtotal < 5000000 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">
                      Add {formatPrice(5000000 - subtotal)} more to get FREE shipping!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ST</span>
            </div>
            <span className="text-xl font-bold">SmartTools Hub</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 SmartTools Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;