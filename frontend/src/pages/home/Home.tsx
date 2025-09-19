import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, HeadphonesIcon } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { getFeaturedProducts, getPopularProducts, categories } from '../../data/products';
import type { Product } from '../../types';

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const popularProducts = getPopularProducts().slice(0, 4);

  const handleAddToCart = (product: Product) => {
    // TODO: Implement cart functionality
    console.log('Adding to cart:', product.name);
  };

  const handleAddToWishlist = (product: Product) => {
    // TODO: Implement wishlist functionality
    console.log('Adding to wishlist:', product.name);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Tools for <span className="text-primary-200">Every Project</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover quality tools from top brands, delivered across Nigeria with Pay-on-Delivery option
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Link to="/products" className="flex items-center">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary-600">
                Browse Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center" padding="lg">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-600 text-sm">Free delivery on orders above ₦50,000 within Lagos</p>
            </Card>

            <Card className="text-center" padding="lg">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600 text-sm">All products come with manufacturer warranty</p>
            </Card>

            <Card className="text-center" padding="lg">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Pay on Delivery</h3>
              <p className="text-gray-600 text-sm">Convenient payment when your order arrives</p>
            </Card>

            <Card className="text-center" padding="lg">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">Get help choosing the right tools for your needs</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find exactly what you need from our comprehensive collection of professional tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="group"
              >
                <Card hover className="text-center" padding="lg">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    <span className="text-2xl font-bold text-primary-600">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {category.productCount} products
                  </p>
                  <p className="text-gray-500 text-xs">
                    {category.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Handpicked tools recommended by professionals
              </p>
            </div>
            <Link to="/products?featured=true">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular This Week
              </h2>
              <p className="text-gray-600">
                Most loved products by our customers
              </p>
            </div>
            <Link to="/products?popular=true">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated with SmartTools Hub
            </h2>
            <p className="text-primary-100 mb-8">
              Get the latest deals, new product announcements, and expert tips delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;