import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Simple types for this demo
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand?: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

// Sample products data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'DEWALT 20V MAX Cordless Drill/Driver Kit',
    price: 89999,
    originalPrice: 109999,
    image: '/api/placeholder/300/300',
    category: 'Power Tools',
    brand: 'DEWALT',
    inStock: true,
    rating: 4.7,
    reviewCount: 234,
  },
  {
    id: '2',
    name: 'Makita 18V LXT Circular Saw',
    price: 159999,
    image: '/api/placeholder/300/300',
    category: 'Power Tools',
    brand: 'Makita',
    inStock: true,
    rating: 4.8,
    reviewCount: 142,
  },
  {
    id: '3',
    name: 'Stanley 25-Piece Screwdriver Set',
    price: 24999,
    originalPrice: 29999,
    image: '/api/placeholder/300/300',
    category: 'Hand Tools',
    brand: 'Stanley',
    inStock: true,
    rating: 4.5,
    reviewCount: 89,
  },
  {
    id: '4',
    name: '3M WorkTunes Hearing Protection',
    price: 79999,
    image: '/api/placeholder/300/300',
    category: 'Safety Equipment',
    brand: '3M',
    inStock: true,
    rating: 4.6,
    reviewCount: 76,
  },
  {
    id: '5',
    name: 'Bosch Random Orbital Sander',
    price: 119999,
    image: '/api/placeholder/300/300',
    category: 'Power Tools',
    brand: 'Bosch',
    inStock: false,
    rating: 4.4,
    reviewCount: 54,
  },
  {
    id: '6',
    name: 'Milwaukee Tape Measure 25ft',
    price: 34999,
    image: '/api/placeholder/300/300',
    category: 'Hand Tools',
    brand: 'Milwaukee',
    inStock: true,
    rating: 4.7,
    reviewCount: 123,
  },
];

const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['All', 'Power Tools', 'Hand Tools', 'Safety Equipment', 'Hardware'];

  const filteredProducts = sampleProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price / 100);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

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
            <Link to="/">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-gray-600">Browse our complete collection of professional tools and equipment</p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <input
              type="text"
              placeholder="Search by product name or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square bg-gray-100 flex items-center justify-center rounded-t-lg">
                  <span className="text-6xl">🔧</span>
                </div>
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      SALE
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded">
                      OUT OF STOCK
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                {/* Brand */}
                {product.brand && (
                  <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                )}

                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {/* Category */}
                <p className="text-xs text-blue-600 mb-2">{product.category}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={!product.inStock}
                  className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                    product.inStock
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or category filter
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
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

export default ProductsPage;