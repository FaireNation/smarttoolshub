import React from 'react';
import { Link } from 'react-router-dom';

const SimpleHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ST</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SmartTools Hub</span>
            </div>
            <Link to="/products">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Tools for <span className="text-blue-200">Every Project</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover quality tools from top brands, delivered across Nigeria with Pay-on-Delivery option
            </p>
            <Link to="/products">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🚚", title: "Free Delivery", desc: "Free delivery on orders above ₦50,000" },
              { icon: "🛡️", title: "Quality Guarantee", desc: "All products come with manufacturer warranty" },
              { icon: "💰", title: "Pay on Delivery", desc: "Convenient payment when your order arrives" },
              { icon: "🎧", title: "Expert Support", desc: "Get help choosing the right tools" }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
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
            {[
              { name: "Power Tools", count: 45, desc: "Electric and battery-powered tools" },
              { name: "Hand Tools", count: 32, desc: "Essential manual tools for every workshop" },
              { name: "Hardware", count: 28, desc: "Screws, bolts, fasteners and accessories" },
              { name: "Safety Equipment", count: 19, desc: "Personal protective equipment" }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {category.count} products
                </p>
                <p className="text-gray-500 text-xs">
                  {category.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ST</span>
              </div>
              <span className="text-xl font-bold">SmartTools Hub</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Your one-stop shop for quality tools and hardware in Nigeria. 
              We deliver professional-grade tools right to your doorstep.
            </p>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400 text-sm">
                © 2024 SmartTools Hub. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimpleHome;