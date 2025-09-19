import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  className
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price / 100); // Convert from kobo to naira
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToWishlist?.(product);
  };

  return (
    <Card className={cn('group cursor-pointer', className)} hover padding="none">
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 flex items-center justify-center">
            {product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback for missing images
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBWMTMwTTcwIDEwMEgxMzAiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==';
                }}
              />
            ) : (
              <div className="w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                SALE
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded">
                FEATURED
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded">
                OUT OF STOCK
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleAddToWishlist}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50"
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          {/* Brand */}
          {product.brand && (
            <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-4 w-4',
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  )}
                />
              ))}
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
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;