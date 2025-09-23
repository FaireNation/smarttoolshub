import React, { useState } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Image,
    Chip,
    Divider,
    ButtonGroup,
} from "@heroui/react";
import {
    Star,
    ShoppingCart,
    Heart,
    Share2,
    Minus,
    Plus,
    ChevronLeft,
    ChevronRight,
    X,
} from "lucide-react";
import { Product } from "../types";

interface QuickViewModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    product: Product | null;
    onAddToCart: (product: Product, quantity: number) => void;
    onAddToWishlist: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
    isOpen,
    onOpenChange,
    product,
    onAddToCart,
    onAddToWishlist,
}) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
        }).format(price / 100);
    };

    const handleAddToCart = async () => {
        if (!product) return;
        setIsAddingToCart(true);
        try {
            await onAddToCart(product, quantity);
            // Show success feedback here
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleAddToWishlist = async () => {
        if (!product) return;
        setIsAddingToWishlist(true);
        try {
            await onAddToWishlist(product);
            // Show success feedback here
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        } finally {
            setIsAddingToWishlist(false);
        }
    };

    const incrementQuantity = () => {
        if (product && quantity < product.stockQuantity) {
            setQuantity(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const nextImage = () => {
        if (product && selectedImageIndex < product.images.length - 1) {
            setSelectedImageIndex(prev => prev + 1);
        }
    };

    const previousImage = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(prev => prev - 1);
        }
    };

    if (!product) return null;

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="5xl"
            scrollBehavior="inside"
            hideCloseButton={true}
            isDismissable={true}
            isKeyboardDismissDisabled={false}
            className="mx-4"
            classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                base: "border-none shadow-2xl",
                header: "border-b-[1px] border-default-200",
                footer: "border-t-[1px] border-default-200",
            }}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <div className="flex items-center px-3 justify-between w-full">
                        <h2 className="text-xl font-bold">Quick View</h2>
                        <Button
                            isIconOnly
                            variant="light"
                            onPress={() => onOpenChange(false)}
                            className="text-default-500"
                            size="sm"
                        >
                            <X size={18} />
                        </Button>
                    </div>
                </ModalHeader>
                <ModalBody className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px]">
                        {/* Image Gallery */}
                        <div className="relative bg-content2 p-6 flex flex-col">
                            <div className="relative flex-1 flex items-center justify-center mb-4">
                                <Image
                                    src={product.images[selectedImageIndex] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'}
                                    alt={product.name}
                                    className="w-full h-96 object-cover rounded-xl shadow-lg"
                                    radius="lg"
                                />

                                {/* Image Navigation */}
                                {product.images.length > 1 && (
                                    <>
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="solid"
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
                                            onClick={previousImage}
                                            isDisabled={selectedImageIndex === 0}
                                        >
                                            <ChevronLeft size={16} />
                                        </Button>
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="solid"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
                                            onClick={nextImage}
                                            isDisabled={selectedImageIndex === product.images.length - 1}
                                        >
                                            <ChevronRight size={16} />
                                        </Button>
                                    </>
                                )}

                                {/* Discount Badge */}
                                {discountPercentage > 0 && (
                                    <div className="absolute top-3 left-3">
                                        <Chip color="danger" variant="solid" size="sm">
                                            -{discountPercentage}%
                                        </Chip>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Gallery */}
                            {product.images.length > 1 && (
                                <div className="flex gap-2 justify-center">
                                    {product.images.slice(0, 4).map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`relative overflow-hidden rounded-lg transition-all duration-200 ${selectedImageIndex === index
                                                ? 'ring-2 ring-primary ring-offset-2 ring-offset-content2'
                                                : 'hover:opacity-80'
                                                }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${product.name} ${index + 1}`}
                                                className="w-16 h-16 object-cover"
                                                radius="sm"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="p-6 space-y-6">
                            {/* Brand & Category */}
                            <div className="flex items-center gap-2 flex-wrap">
                                {product.brand && (
                                    <Chip size="sm" variant="flat" color="primary">
                                        {product.brand}
                                    </Chip>
                                )}
                                <Chip size="sm" variant="flat" color="default">
                                    {product.category}
                                </Chip>
                            </div>

                            {/* Title & Description */}
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-3">
                                    {product.name}
                                </h3>
                                <p className="text-default-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Rating & Reviews */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={i < Math.floor(product.rating)
                                                ? 'text-warning fill-current'
                                                : 'text-default-300'
                                            }
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-default-600">
                                    {product.rating} ({product.reviewCount} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-bold text-primary">
                                        {formatPrice(product.price)}
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-xl text-default-500 line-through">
                                            {formatPrice(product.originalPrice)}
                                        </span>
                                    )}
                                </div>
                                {product.originalPrice && (
                                    <div className="text-sm text-success-600 font-medium">
                                        You save {formatPrice(product.originalPrice - product.price)}
                                    </div>
                                )}
                            </div>

                            {/* Stock Status */}
                            <div className="flex items-center gap-3">
                                <Chip
                                    color={product.inStock ? "success" : "danger"}
                                    variant="flat"
                                    startContent={
                                        product.inStock ?
                                            <div className="w-2 h-2 bg-success rounded-full" /> :
                                            <div className="w-2 h-2 bg-danger rounded-full" />
                                    }
                                >
                                    {product.inStock ? "In Stock" : "Out of Stock"}
                                </Chip>
                                {product.inStock && (
                                    <span className="text-sm text-default-600">
                                        {product.stockQuantity} units available
                                    </span>
                                )}
                            </div>

                            {/* Quantity Selector */}
                            {product.inStock && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium">Quantity:</span>
                                        <ButtonGroup size="sm" variant="bordered">
                                            <Button
                                                isIconOnly
                                                onClick={decrementQuantity}
                                                isDisabled={quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </Button>
                                            <Button isDisabled className="min-w-[60px] font-semibold">
                                                {quantity}
                                            </Button>
                                            <Button
                                                isIconOnly
                                                onClick={incrementQuantity}
                                                isDisabled={quantity >= product.stockQuantity}
                                            >
                                                <Plus size={14} />
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <Button
                                    color="primary"
                                    size="lg"
                                    className="flex-1 font-semibold"
                                    startContent={<ShoppingCart size={18} />}
                                    isDisabled={!product.inStock}
                                    isLoading={isAddingToCart}
                                    onClick={handleAddToCart}
                                >
                                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                                </Button>
                                <Button
                                    isIconOnly
                                    size="lg"
                                    variant="bordered"
                                    isLoading={isAddingToWishlist}
                                    onClick={handleAddToWishlist}
                                >
                                    <Heart size={18} />
                                </Button>
                                <Button
                                    isIconOnly
                                    size="lg"
                                    variant="bordered"
                                >
                                    <Share2 size={18} />
                                </Button>
                            </div>

                            {/* Specifications */}
                            {product.specifications && Object.keys(product.specifications).length > 0 && (
                                <>
                                    <Divider />
                                    <div>
                                        <h4 className="font-semibold mb-3 text-foreground">Specifications</h4>
                                        <div className="space-y-2">
                                            {Object.entries(product.specifications).map(([key, value]) => (
                                                <div key={key} className="flex justify-between py-1.5 text-sm border-b border-default-100 last:border-0">
                                                    <span className="text-default-600 font-medium">{key}:</span>
                                                    <span className="text-foreground">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default QuickViewModal;