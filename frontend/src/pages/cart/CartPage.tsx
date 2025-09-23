import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
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
import Layout from '../../components/layout/Layout';
import { useCart, useCartSummary } from '../../context/CartContext';
import { formatPrice, validatePromoCode, applyDiscount } from '../../utils/cart/cartUtils';
import Input from '../../components/ui/Input';

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const { cart, updateQuantity, removeFromCart, clearCart, applyDiscount: applyCartDiscount } = useCart();
    const cartSummary = useCartSummary();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [promoCode, setPromoCode] = useState('');
    const [promoMessage, setPromoMessage] = useState('');
    const [isPromoValid, setIsPromoValid] = useState(false);

    const handleQuantityUpdate = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleRemoveItem = (productId: string) => {
        removeFromCart(productId);
    };

    const handlePromoCode = () => {
        const promoResult = validatePromoCode(promoCode);

        if (promoResult.valid) {
            const discountAmount = applyDiscount(cartSummary.subtotal, promoCode);
            applyCartDiscount(discountAmount);
            setIsPromoValid(true);
            setPromoMessage(promoResult.message);
        } else {
            setIsPromoValid(false);
            setPromoMessage(promoResult.message);
        }
    };

    const handleClearCart = () => {
        clearCart();
        onOpenChange();
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (cart.items.length === 0) {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto px-4 py-16">
                    <div className="text-center pt-20 pb-20">
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
                            className="font-medium mt-4"
                            startContent={<ArrowLeft size={20} />}
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto pt-7 pb-20">
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
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Shopping Cart</h1>
                    <p className="text-default-600">
                        {cartSummary.totalItems} {cartSummary.totalItems === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            {cartSummary.needsAmountForFreeShipping > 0 && (
                                <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Truck size={20} className="text-success-600" />
                                        <span className="text-success-800 font-medium">
                                            Add {formatPrice(cartSummary.needsAmountForFreeShipping)} more for FREE shipping!
                                        </span>
                                    </div>
                                    <Progress
                                        value={cartSummary.freeShippingProgress}
                                        color="success"
                                        className="h-2"
                                    />
                                </div>
                            )}

                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold">Items in your cart</h3>
                                <Button
                                    variant="light"
                                    color="danger"
                                    size="sm"
                                    onPress={onOpen}
                                    startContent={<Trash2 size={16} />}
                                >
                                    Clear Cart
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {cart.items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 border border-default-200 rounded-lg">
                                        <div className="w-20 h-20 flex-shrink-0">
                                            <Image
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-foreground mb-1 line-clamp-2">
                                                {item.product.name}
                                            </h4>

                                            {item.product.brand && (
                                                <p className="text-sm text-default-500 mb-2">{item.product.brand}</p>
                                            )}

                                            <div className="flex items-center gap-4 mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-lg">
                                                        {formatPrice(item.product.price)}
                                                    </span>
                                                    {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                                                        <>
                                                            <span className="text-sm text-default-400 line-through">
                                                                {formatPrice(item.product.originalPrice)}
                                                            </span>
                                                            <Chip size="sm" color="success" variant="flat">
                                                                Save {formatPrice(item.product.originalPrice - item.product.price)}
                                                            </Chip>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        isIconOnly
                                                        onPress={() => handleQuantityUpdate(item.product.id, item.quantity - 1)}
                                                    >
                                                        <Minus size={16} />
                                                    </Button>
                                                    <span className="px-3 py-1 bg-default-100 rounded-md min-w-[3rem] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        isIconOnly
                                                        onPress={() => handleQuantityUpdate(item.product.id, item.quantity + 1)}
                                                    >
                                                        <Plus size={16} />
                                                    </Button>
                                                </div>

                                                <Button
                                                    size="sm"
                                                    variant="light"
                                                    color="danger"
                                                    onPress={() => handleRemoveItem(item.product.id)}
                                                    startContent={<Trash2 size={16} />}
                                                >
                                                    Remove
                                                </Button>
                                            </div>

                                            {!item.product.inStock && (
                                                <Chip size="sm" color="danger" variant="flat" className="mt-2">
                                                    Out of Stock
                                                </Chip>
                                            )}
                                        </div>

                                        <div className="text-right flex-shrink-0">
                                            <p className="font-semibold text-lg">
                                                {formatPrice(item.product.price * item.quantity)}
                                            </p>
                                            {item.quantity > 1 && (
                                                <p className="text-sm text-default-500">
                                                    {formatPrice(item.product.price)} each
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-4">
                            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

                            <div className="mb-6">
                                <div className="flex gap-2 mb-2">
                                    <Input
                                        placeholder="Enter promo code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        startContent={<Tag size={18} />}
                                        size="sm"
                                    />
                                    <Button
                                        color="primary"
                                        variant="bordered"
                                        size="sm"
                                        onPress={handlePromoCode}
                                        isDisabled={!promoCode.trim()}
                                    >
                                        Apply
                                    </Button>
                                </div>
                                {promoMessage && (
                                    <p className={`text-sm ${isPromoValid ? 'text-success-600' : 'text-danger-600'}`}>
                                        {promoMessage}
                                    </p>
                                )}
                            </div>

                            <Divider className="mb-4" />

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal ({cartSummary.totalItems} items)</span>
                                    <span>{cartSummary.subtotalFormatted}</span>
                                </div>

                                {cartSummary.discount > 0 && (
                                    <div className="flex justify-between text-success-600">
                                        <span>Discount</span>
                                        <span>-{cartSummary.discountFormatted}</span>
                                    </div>
                                )}

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>
                                        {cartSummary.shippingFee === 0 ? (
                                            <span className="text-success-600">FREE</span>
                                        ) : (
                                            cartSummary.shippingFeeFormatted
                                        )}
                                    </span>
                                </div>

                                <Divider />

                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>{cartSummary.totalAmountFormatted}</span>
                                </div>
                            </div>

                            <Button
                                color="primary"
                                size="lg"
                                className="w-full font-medium mb-4"
                                onPress={handleCheckout}
                                startContent={<CreditCard size={20} />}
                            >
                                Proceed to Checkout
                            </Button>

                            <div className="space-y-3 text-sm text-default-600">
                                <div className="flex items-center gap-3">
                                    <Shield size={16} className="text-success-600" />
                                    <span>Secure checkout</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Truck size={16} className="text-success-600" />
                                    <span>Free shipping on orders above {formatPrice(cartSummary.freeShippingThreshold)}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Gift size={16} className="text-success-600" />
                                    <span>Pay on delivery available</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
                    <ModalContent className="p-4">
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Clear Shopping Cart
                                </ModalHeader>
                                <ModalBody>
                                    <p>Are you sure you want to remove all items from your cart? This action cannot be undone.</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button color="danger" onPress={handleClearCart}>
                                        Clear Cart
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </Layout>
    );
};

export default CartPage;