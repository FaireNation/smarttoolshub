import React from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Button,
    Badge,
    Image,
    Chip,
} from "@heroui/react";
import {
    Star,
    ShoppingCart,
    Heart,
    Eye,
} from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
    onAddToWishlist?: (product: Product) => void;
    onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onQuickView,
    onAddToWishlist,
    onAddToCart,
}) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
        }).format(price / 100);
    };

    // Grid view (default)
    return (
        <Card radius="none" className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="relative overflow-hidden">
                <Image
                    shadow="sm"
                    width="100%"
                    radius="none"
                    alt={product.name}
                    className="w-full object-cover h-[200px]"
                    src={product.images[0] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'}
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isSale && (
                        <Badge color="danger" variant="solid" size="sm">
                            Sale
                        </Badge>
                    )}
                    {product.isPopular && (
                        <Badge color="warning" variant="solid" size="sm">
                            Popular
                        </Badge>
                    )}
                    {!product.inStock && (
                        <Badge color="default" variant="solid" size="sm">
                            Out of Stock
                        </Badge>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                    <Button
                        isIconOnly
                        size="sm"
                        variant="solid"
                        className="bg-white hover:bg-white shadow-md hover:shadow-lg z-10"
                        onClick={() => onQuickView?.(product)}
                    >
                        <Eye size={16} className="text-default-700" />
                    </Button>
                    <Button
                        isIconOnly
                        size="sm"
                        variant="solid"
                        className="bg-white hover:bg-white shadow-md hover:shadow-lg z-10"
                        onClick={() => onAddToWishlist?.(product)}
                    >
                        <Heart size={16} className="text-default-700" />
                    </Button>
                </div>
            </div>

            <CardBody className="p-4">
                {/* Brand */}
                {product.brand && (
                    <Chip size="sm" variant="flat" className="mb-2 w-fit">
                        {product.brand}
                    </Chip>
                )}

                {/* Product Name */}
                <h3 className="font-semibold text-medium group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={i < Math.floor(product.rating) ? 'text-warning fill-current' : 'text-default-300'}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-default-600">
                        {product.rating} ({product.reviewCount})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-3">
                    <span className="text-lg font-bold text-primary">
                        {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-default-500 line-through">
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                </div>
            </CardBody>

            <CardFooter className="px-4 pb-4">
                <Button
                    color="primary"
                    variant="solid"
                    fullWidth
                    startContent={<ShoppingCart size={16} />}
                    isDisabled={!product.inStock}
                    className="font-medium mb-3"
                    onClick={() => onAddToCart?.(product)}
                >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;