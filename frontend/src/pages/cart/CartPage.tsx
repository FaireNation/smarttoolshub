import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    Input,
    Divider,
    Image,
    Chip,
    Progress,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react";
import {
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    ArrowLeft,
    CreditCard,
    Truck,
    Shield,
    Gift,
    Tag,
} from "lucide-react";
import ModernLayout from '../../components/layout/Layout';

// Cart item interface
interface CartItem {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    image: string;
    brand: string;
    inStock: boolean;
}

const ModernCartPage: React.FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [promoCode, setPromoCode] = useState('');

    // Enhanced cart items with proper images
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: '1',
            name: 'DEWALT 20V MAX Cordless Drill/Driver Kit',
            price: 89999,
            originalPrice: 109999,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=150&h=150&fit=crop',
            brand: 'DEWALT',
            inStock: true,
        },
        {
            id: '3',
            name: 'Stanley 25-Piece Screwdriver Set',
            price: 24999,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop',
            brand: 'Stanley',
            inStock: true,
        },
        {
            id: '6',
            name: 'DeWalt Safety Hard Hat',
            price: 12999,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop',
            brand: 'DEWALT',
            inStock: true,
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
    const discount = 0; // Can be calculated based on promo code
    const shippingFee = subtotal >= 5000000 ? 0 : 500000; // Free shipping above ₦50,000
    const total = subtotal - discount + shippingFee;
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const shippingProgress = Math.min((subtotal / 5000000) * 100, 100);

    if (cartItems.length === 0) {
        return (
            <ModernLayout>
                <div className="max-w-4xl mx-auto px-4 py-16">
                    <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-6 bg-default-100 rounded-full flex items-center justify-center">
                            <ShoppingCart size={48} className="text-default-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
                        <p className="text-default-600 mb-8 max-w-md mx-auto">
                            Looks like you haven't added any items to your cart yet.
                            Start shopping to add items to your cart.
                        </p>
                        <Button
                            as={Link}
                            to="/products"
                            color="primary"
                            size="lg"
                            className="font-medium"
                            startContent={<ArrowLeft size={20} />}
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </div>
            </ModernLayout>
        );
    }

    return (
        <ModernLayout>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Button
                            as={Link}
                            to="/products"
                            variant="light"
                            startContent={<ArrowLeft size={18} />}
                            className="text-default-600"
                        >
                            Continue Shopping
                        </Button>
                        <Divider orientation="vertical" className="h-6" />
                        <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
                    </div>
                    <p className="text-default-600">
                        {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Free Shipping Progress */}
                        <Card className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">
                                    {shippingFee === 0 ? '🎉 You qualify for free shipping!' : 'Add more for free shipping'}
                                </span>
                                <span className="text-sm text-default-600">
                                    {formatPrice(5000000 - subtotal > 0 ? 5000000 - subtotal : 0)} to go
                                </span>
                            </div>
                            <Progress
                                value={shippingProgress}
                                color={shippingFee === 0 ? 'success' : 'primary'}
                                className="mb-2"
                            />
                            <div className="flex items-center gap-2">
                                <Truck size={16} className="text-success" />
                                <span className="text-xs text-default-600">
                                    Free shipping on orders above ₦50,000
                                </span>
                            </div>
                        </Card>

                        {/* Cart Items List */}
                        {cartItems.map((item) => (
                            <Card key={item.id} className="p-4">
                                <div className="flex gap-4">
                                    {/* Product Image */}
                                    <div className="flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <Chip size="sm" variant="flat" className="mb-1">
                                                    {item.brand}
                                                </Chip>
                                                <h3 className="font-semibold text-medium line-clamp-2">
                                                    {item.name}
                                                </h3>
                                            </div>
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                color="danger"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            {/* Price */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-primary">
                                                    {formatPrice(item.price)}
                                                </span>
                                                {item.originalPrice && (
                                                    <span className="text-sm text-default-500 line-through">
                                                        {formatPrice(item.originalPrice)}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="bordered"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    isDisabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </Button>
                                                <span className="w-12 text-center font-medium">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="bordered"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus size={14} />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Item Total */}
                                        <div className="mt-2 text-right">
                                            <span className="text-sm text-default-600">
                                                Subtotal: {formatPrice(item.price * item.quantity)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-4">
                            <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-default-600">Subtotal</span>
                                    <span className="font-medium">{formatPrice(subtotal)}</span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between text-success">
                                        <span>Discount</span>
                                        <span>-{formatPrice(discount)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between">
                                    <span className="text-default-600">Shipping</span>
                                    <span className="font-medium">
                                        {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                                    </span>
                                </div>

                                <Divider />

                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-primary">{formatPrice(total)}</span>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="mb-6">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Promo code"
                                        value={promoCode}
                                        onValueChange={setPromoCode}
                                        startContent={<Tag size={16} />}
                                        variant="bordered"
                                        size="sm"
                                    />
                                    <Button size="sm" variant="bordered">
                                        Apply
                                    </Button>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <Button
                                color="primary"
                                size="lg"
                                fullWidth
                                startContent={<CreditCard size={20} />}
                                className="font-medium mb-4"
                                onPress={onOpen}
                            >
                                Proceed to Checkout
                            </Button>

                            {/* Security Features */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-default-600">
                                    <Shield size={16} className="text-success flex-shrink-0" />
                                    <span>Secure checkout with SSL encryption</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-default-600">
                                    <Truck size={16} className="text-primary flex-shrink-0" />
                                    <span>Pay-on-Delivery available</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-default-600">
                                    <Gift size={16} className="text-warning flex-shrink-0" />
                                    <span>30-day return policy</span>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <Divider className="my-4" />
                            <div>
                                <p className="text-sm font-medium mb-2">We Accept:</p>
                                <div className="flex gap-2">
                                    <Chip size="sm" variant="bordered">Cash</Chip>
                                    <Chip size="sm" variant="bordered">Transfer</Chip>
                                    <Chip size="sm" variant="bordered">Card</Chip>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Checkout Modal */}
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Checkout - Pay on Delivery
                                </ModalHeader>
                                <ModalBody>
                                    <div className="space-y-6">
                                        <Card className="p-4 bg-success-50 border border-success-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
                                                    <CreditCard size={20} className="text-success-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-success-800">Pay on Delivery Available</h4>
                                                    <p className="text-sm text-success-600">
                                                        You can pay when your order arrives at your doorstep
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>

                                        <div className="space-y-4">
                                            <h4 className="font-medium">Order Summary</h4>
                                            <div className="space-y-2">
                                                {cartItems.map((item) => (
                                                    <div key={item.id} className="flex justify-between text-sm">
                                                        <span>{item.name} x {item.quantity}</span>
                                                        <span>{formatPrice(item.price * item.quantity)}</span>
                                                    </div>
                                                ))}
                                                <Divider />
                                                <div className="flex justify-between font-bold">
                                                    <span>Total</span>
                                                    <span className="text-primary">{formatPrice(total)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-sm text-default-600">
                                                By proceeding, you agree to our Terms of Service and Privacy Policy.
                                                Your order will be prepared and delivered within 2-5 business days.
                                            </p>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" onPress={onClose} className="font-medium">
                                        Confirm Order
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </ModernLayout>
    );
};

export default ModernCartPage;