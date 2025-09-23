import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    Select,
    SelectItem,
    Checkbox,
    Divider,
    Image,
    Chip,
    Textarea,
} from "@heroui/react";
import {
    ArrowLeft,
    CreditCard,
    Truck,
    Shield,
    User,
    MapPin,
    Phone,
    Mail,
    CheckCircle,
} from "lucide-react";
import Layout from '../../components/layout/Layout';
import { useCart, useCartSummary } from '../../context/CartContext';
import { CheckoutFormData, Order, NIGERIAN_STATES } from '../../types/cart';
import {
    formatPrice,
    generateOrderId,
    calculateDeliveryDate,
    formatNigerianPhone,
    validateNigerianPhone,
    getFromStorage,
    saveToStorage
} from '../../utils/cart/cartUtils';
import Input from '../../components/ui/Input';

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const cartSummary = useCartSummary();

    const [isProcessing, setIsProcessing] = useState(false);

    // Form state
    const [formData, setFormData] = useState<CheckoutFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        shippingAddress: {
            street: '',
            city: '',
            state: '',
            lga: '',
            zipCode: '',
        },
        billingAddress: {
            street: '',
            city: '',
            state: '',
            lga: '',
            zipCode: '',
            sameAsShipping: true,
        },
        orderNotes: '',
        subscribeToNewsletter: false,
        paymentMethod: 'pay-on-delivery',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleAddressChange = (type: 'shippingAddress' | 'billingAddress', field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [field]: value
            }
        }));
    };

    const handleStateChange = (type: 'shippingAddress' | 'billingAddress', state: string) => {
        setFormData(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                state,
                lga: '' // Reset LGA when state changes
            }
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        // Customer info validation
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';

        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!validateNigerianPhone(formData.phone)) newErrors.phone = 'Invalid Nigerian phone number';

        // Shipping address validation
        if (!formData.shippingAddress.street.trim()) newErrors.street = 'Street address is required';
        if (!formData.shippingAddress.city.trim()) newErrors.city = 'City is required';
        if (!formData.shippingAddress.state.trim()) newErrors.state = 'State is required';
        if (!formData.shippingAddress.lga.trim()) newErrors.lga = 'Local Government Area is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) return;

        setIsProcessing(true);

        try {
            // Simulate order processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            const newOrderId = generateOrderId();
            const deliveryDate = calculateDeliveryDate(formData.shippingAddress.state, formData.shippingAddress.city);

            // Create order object
            const order: Order = {
                id: newOrderId,
                orderNumber: newOrderId,
                status: 'pending',
                customer: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formatNigerianPhone(formData.phone),
                },
                items: cart.items.map(item => ({
                    id: item.id,
                    productId: item.product.id,
                    name: item.product.name,
                    price: item.product.price,
                    originalPrice: item.product.originalPrice,
                    quantity: item.quantity,
                    image: item.product.images[0],
                    brand: item.product.brand,
                    weight: 1000, // Default weight, could be calculated
                })),
                shippingAddress: formData.shippingAddress,
                billingAddress: formData.billingAddress?.sameAsShipping ?
                    formData.shippingAddress : formData.billingAddress,
                subtotal: cartSummary.subtotal,
                discount: cartSummary.discount,
                shippingFee: cartSummary.shippingFee,
                totalAmount: cartSummary.totalAmount,
                orderDate: new Date().toISOString(),
                estimatedDelivery: deliveryDate.toISOString(),
                orderNotes: formData.orderNotes,
                paymentMethod: 'pay-on-delivery',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };

            // Save order to local storage
            const existingOrders = getFromStorage<Order[]>('smarttools_orders', []);
            existingOrders.unshift(order);
            saveToStorage('smarttools_orders', existingOrders);

            // Prepare order data for success page
            const orderData = {
                orderId: newOrderId,
                orderDate: order.orderDate,
                estimatedDelivery: order.estimatedDelivery,
                customerInfo: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formatNigerianPhone(formData.phone),
                },
                shippingAddress: formData.shippingAddress,
                paymentMethod: 'Pay on Delivery',
                items: cart.items.map(item => ({
                    id: item.id,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                })),
                subtotal: cartSummary.subtotal,
                shippingFee: cartSummary.shippingFee,
                discount: cartSummary.discount,
                total: cartSummary.totalAmount,
            };

            // Navigate to success page first, then clear cart
            navigate('/order-success', {
                state: { orderData },
                replace: true
            });

            // Use setTimeout to clear cart after navigation to ensure it doesn't interfere
            setTimeout(() => {
                clearCart();
            }, 100);

        } catch (error) {
            console.error('Error placing order:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    // Redirect to cart if empty
    if (cart.items.length === 0) {
        navigate('/cart');
        return null;
    }

    const selectedState = NIGERIAN_STATES.find(state =>
        state.state === formData.shippingAddress.state
    );

    return (
        <Layout>
            <div className="max-w-7xl mx-auto pt-7 pb-20">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        onClick={() => navigate('/cart')}
                        variant="light"
                        startContent={<ArrowLeft size={18} />}
                        className="text-default-600 mb-4"
                    >
                        Back to Cart
                    </Button>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
                    <p className="text-default-600">Complete your order information</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Information */}
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <User size={24} className="text-primary" />
                                <h2 className="text-xl font-semibold">Customer Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="First Name"
                                    type="text"
                                    placeholder="Enter your first name"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    isInvalid={!!errors.firstName}
                                    errorMessage={errors.firstName}
                                    isRequired
                                />
                                <Input
                                    label="Last Name"
                                    type="text"
                                    placeholder="Enter your last name"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    isInvalid={!!errors.lastName}
                                    errorMessage={errors.lastName}
                                    isRequired
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    isInvalid={!!errors.email}
                                    errorMessage={errors.email}
                                    startContent={<Mail size={18} />}
                                    isRequired
                                />
                                <Input
                                    label="Phone Number"
                                    placeholder="0801234567"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    isInvalid={!!errors.phone}
                                    errorMessage={errors.phone}
                                    startContent={<Phone size={18} />}
                                    isRequired
                                />
                            </div>

                            <div className="mt-4">
                                <Checkbox
                                    isSelected={formData.subscribeToNewsletter}
                                    onValueChange={(checked) => setFormData(prev => ({ ...prev, subscribeToNewsletter: checked }))}
                                >
                                    Subscribe to our newsletter for updates and offers
                                </Checkbox>
                            </div>
                        </Card>

                        {/* Shipping Address */}
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <MapPin size={24} className="text-primary" />
                                <h2 className="text-xl font-semibold">Shipping Address</h2>
                            </div>

                            <div className="space-y-4">
                                <Input
                                    label="Street Address"
                                    type="text"
                                    placeholder="Enter your street address"
                                    value={formData.shippingAddress.street}
                                    onChange={(e) => handleAddressChange('shippingAddress', 'street', e.target.value)}
                                    isInvalid={!!errors.street}
                                    errorMessage={errors.street}
                                    isRequired
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="City"
                                        type="text"
                                        placeholder="Enter your city"
                                        value={formData.shippingAddress.city}
                                        onChange={(e) => handleAddressChange('shippingAddress', 'city', e.target.value)}
                                        isInvalid={!!errors.city}
                                        errorMessage={errors.city}
                                        isRequired
                                    />
                                    <Input
                                        label="Postal Code (Optional)"
                                        type="text"
                                        placeholder="100001"
                                        value={formData.shippingAddress.zipCode || ''}
                                        onChange={(e) => handleAddressChange('shippingAddress', 'zipCode', e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Select
                                        label="State"
                                        placeholder="Select your state"
                                        value={formData.shippingAddress.state}
                                        onChange={(e) => handleStateChange('shippingAddress', e.target.value)}
                                        isInvalid={!!errors.state}
                                        errorMessage={errors.state}
                                        isRequired
                                    >
                                        {NIGERIAN_STATES.map((state) => (
                                            <SelectItem key={state.state} value={state.state}>
                                                {state.state}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label="Local Government Area"
                                        placeholder="Select LGA"
                                        value={formData.shippingAddress.lga}
                                        onChange={(e) => handleAddressChange('shippingAddress', 'lga', e.target.value)}
                                        isInvalid={!!errors.lga}
                                        errorMessage={errors.lga}
                                        isDisabled={!selectedState}
                                        isRequired
                                    >
                                        {selectedState ? selectedState.lgas.map((lga) => (
                                            <SelectItem key={lga} value={lga}>
                                                {lga}
                                            </SelectItem>
                                        )) : []}
                                    </Select>
                                </div>
                            </div>
                        </Card>

                        {/* Order Notes */}
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Order Notes (Optional)</h2>
                            <Textarea
                                placeholder="Any special instructions for your order..."
                                value={formData.orderNotes || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, orderNotes: e.target.value }))}
                                minRows={3}
                                maxRows={5}
                            />
                        </Card>

                        {/* Payment Method */}
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <CreditCard size={24} className="text-primary" />
                                <h2 className="text-xl font-semibold">Payment Method</h2>
                            </div>

                            <div className="p-4 border-2 border-primary rounded-lg bg-primary-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                                    <div>
                                        <h3 className="font-medium">Pay on Delivery</h3>
                                        <p className="text-sm text-default-600">Pay with cash when your order arrives</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-4">
                            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

                            {/* Order Items */}
                            <div className="space-y-4 mb-6">
                                {cart.items.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="w-16 h-16 flex-shrink-0">
                                            <Image
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm line-clamp-2 mb-1">
                                                {item.product.name}
                                            </h4>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span>Qty: {item.quantity}</span>
                                                <Chip size="sm" variant="flat">
                                                    {formatPrice(item.product.price * item.quantity)}
                                                </Chip>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Divider className="mb-4" />

                            {/* Summary Details */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
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

                            {/* Place Order Button */}
                            <Button
                                color="primary"
                                size="lg"
                                className="w-full font-medium mb-4"
                                onPress={handlePlaceOrder}
                                isLoading={isProcessing}
                                startContent={!isProcessing && <CheckCircle size={20} />}
                            >
                                {isProcessing ? 'Processing Order...' : 'Place Order'}
                            </Button>

                            {/* Security Features */}
                            <div className="space-y-3 text-sm text-default-600">
                                <div className="flex items-center gap-3">
                                    <Shield size={16} className="text-success-600" />
                                    <span>Your information is secure</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Truck size={16} className="text-success-600" />
                                    <span>Estimated delivery: 2-5 business days</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CheckoutPage;