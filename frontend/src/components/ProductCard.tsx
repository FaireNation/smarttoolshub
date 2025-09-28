import React from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Button,
    Badge,
    Chip,
} from "@heroui/react";
import {
    Star,
    ShoppingCart,
    Heart,
    Eye,
    Check,
} from "lucide-react";
import { Product } from "../types";
import { useCart } from '../context/CartContext';
import { OptimizedImage } from './ui';

interface ProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
    onAddToWishlist?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onQuickView,
    onAddToWishlist,
}) => {
    const { addToCart, isInCart, getItemQuantity } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
        }).format(price / 100);
    };

    const handleAddToCart = () => {
        addToCart(product, 1);
    };

    const inCart = isInCart(product.id);
    const quantity = getItemQuantity(product.id);

    // Grid view (default)
    return (
        <Card radius="none" className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="relative overflow-hidden">
                <OptimizedImage
                    src={product.images[0] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64'}
                    alt={`${product.name}${product.brand ? ` by ${product.brand}` : ''} - Professional tool`}
                    className="w-full object-cover h-[200px]"
                    width={400}
                    height={200}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1" role="group" aria-label="Product status">
                    {product.isSale && (
                        <Badge color="danger" variant="solid" size="sm" aria-label="On sale">
                            Sale
                        </Badge>
                    )}
                    {product.isPopular && (
                        <Badge color="warning" variant="solid" size="sm" aria-label="Popular product">
                            Popular
                        </Badge>
                    )}
                    {!product.inStock && (
                        <Badge color="default" variant="solid" size="sm" aria-label="Currently out of stock">
                            Out of Stock
                        </Badge>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-10" role="group" aria-label="Product actions">
                    <Button
                        isIconOnly
                        size="sm"
                        variant="solid"
                        className="bg-white hover:bg-white shadow-md hover:shadow-lg z-10"
                        onClick={() => onQuickView?.(product)}
                        aria-label={`Quick view ${product.name}`}
                    >
                        <Eye size={16} className="text-default-700" aria-hidden="true" />
                    </Button>
                    <Button
                        isIconOnly
                        size="sm"
                        variant="solid"
                        className="bg-white hover:bg-white shadow-md hover:shadow-lg z-10"
                        onClick={() => onAddToWishlist?.(product)}
                        aria-label={`Add ${product.name} to wishlist`}
                    >
                        <Heart size={16} className="text-default-700" aria-hidden="true" />
                    </Button>
                </div>
            </div>

            <CardBody className="p-4">
                {/* Brand */}
                {product.brand && (
                    <Chip size="sm" variant="flat" className="mb-2 w-fit" aria-label={`Brand: ${product.brand}`}>
                        {product.brand}
                    </Chip>
                )}

                {/* Product Name */}
                <h3 className="font-semibold text-medium group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                    <div className="flex items-center" role="img" aria-label={`${product.rating} out of 5 stars`}>
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={i < Math.floor(product.rating) ? 'text-warning fill-current' : 'text-default-300'}
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                    <span className="text-sm text-default-600" aria-label={`Rating: ${product.rating} stars based on ${product.reviewCount} reviews`}>
                        {product.rating} ({product.reviewCount})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-3">
                    <span className="text-lg font-bold text-primary" aria-label={`Current price: ${formatPrice(product.price)}`}>
                        {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-default-500 line-through" aria-label={`Original price: ${formatPrice(product.originalPrice)}`}>
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                </div>
            </CardBody>

            <CardFooter className="px-4 pb-4">
                <Button
                    color={inCart ? "success" : "primary"}
                    variant={inCart ? "flat" : "solid"}
                    fullWidth
                    startContent={inCart ? <Check size={16} aria-hidden="true" /> : <ShoppingCart size={16} aria-hidden="true" />}
                    isDisabled={!product.inStock}
                    onClick={handleAddToCart}
                    aria-label={
                        !product.inStock
                            ? `${product.name} is out of stock`
                            : inCart
                                ? `${product.name} is in cart (${quantity} items)`
                                : `Add ${product.name} to cart - ${formatPrice(product.price)}`
                    }
                >
                    {!product.inStock
                        ? "Out of Stock"
                        : inCart
                            ? `In Cart (${quantity})`
                            : "Add to Cart"
                    }
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
