import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface HeaderProps {
  cartItemsCount?: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ST</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SmartTools Hub</span>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <Input
                type="text"
                placeholder="Search for tools, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="h-5 w-5 text-gray-400" />}
                className="w-full"
              />
            </form>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </Link>

            {/* User account */}
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5 mr-2" />
              Account
            </Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-8 pb-4">
          <Link
            to="/products"
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
          >
            All Products
          </Link>
          <Link
            to="/categories/power-tools"
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
          >
            Power Tools
          </Link>
          <Link
            to="/categories/hand-tools"
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
          >
            Hand Tools
          </Link>
          <Link
            to="/categories/hardware"
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
          >
            Hardware
          </Link>
          <Link
            to="/categories/safety-equipment"
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
          >
            Safety Equipment
          </Link>
          <Link
            to="/deals"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Deals
          </Link>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile search */}
            <div className="mb-4">
              <form onSubmit={handleSearch}>
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-5 w-5 text-gray-400" />}
                />
              </form>
            </div>

            {/* Mobile navigation */}
            <nav className="space-y-2">
              <Link
                to="/products"
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              <Link
                to="/categories/power-tools"
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Power Tools
              </Link>
              <Link
                to="/categories/hand-tools"
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Hand Tools
              </Link>
              <Link
                to="/categories/hardware"
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Hardware
              </Link>
              <Link
                to="/categories/safety-equipment"
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Safety Equipment
              </Link>
              <Link
                to="/deals"
                className="block py-2 text-primary-600 hover:text-primary-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Deals
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;