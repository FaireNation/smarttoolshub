import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Chip,
} from "@heroui/react";
import {
    CheckCircle,
    Package,
    Truck,
    CreditCard,
    Phone,
    Mail,
    Home,
    ShoppingBag,
    MapPin,
    Clock,
    ArrowRight,
} from "lucide-react";
import Layout from '../../components/layout/Layout';
import { formatPrice } from '../../utils/cart/cartUtils';

interface OrderData {
    orderId: string;
    orderDate: string;
    estimatedDelivery: string;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
    };
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
    };
    paymentMethod: string;
    items: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
    }>;
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
}

const OrderSuccessPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState<OrderData | null>(null);

    useEffect(() => {
        // Get order data from navigation state
        const data = location.state?.orderData as OrderData;

        if (!data) {
            // If no order data, redirect to home
            navigate('/', { replace: true });
            return;
        }

        setOrderData(data);

        // Clear the order data from navigation state after a short delay
        // This prevents the success page from being accessible via back button
        setTimeout(() => {
            window.history.replaceState({}, document.title);
        }, 100);
    }, [location.state, navigate]); if (!orderData) {
        return null; // Will redirect to home
    }

    const getEstimatedDeliveryDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 7); // 7 days from now
        return date.toLocaleDateString('en-NG', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Success Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Order Confirmed!
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Thank you for your purchase. Your order has been successfully placed.
                        </p>
                        <div className="mt-4">
                            <Chip
                                color="success"
                                variant="flat"
                                size="lg"
                                startContent={<Package className="w-4 h-4" />}
                            >
                                Order ID: {orderData.orderId}
                            </Chip>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {/* Order Progress */}
                        <Card className="md:col-span-3">
                            <CardBody>
                                <h3 className="text-lg font-semibold mb-4">Order Status</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-green-600">Order Confirmed</p>
                                            <p className="text-sm text-gray-500">Just now</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Package className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">Processing</p>
                                            <p className="text-sm text-gray-500">Within 24 hours</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Truck className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-400">Shipped</p>
                                            <p className="text-sm text-gray-500">Est. {getEstimatedDeliveryDate()}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Order Details */}
                        <Card>
                            <CardHeader>
                                <h3 className="text-lg font-semibold flex items-center">
                                    <ShoppingBag className="w-5 h-5 mr-2" />
                                    Order Details
                                </h3>
                            </CardHeader>
                            <CardBody className="pt-0">
                                <div className="space-y-4">
                                    {orderData.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    ))}
                                    <Divider />
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>{formatPrice(orderData.subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shipping</span>
                                            <span>{formatPrice(orderData.shippingFee)}</span>
                                        </div>
                                        {orderData.discount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Discount</span>
                                                <span>-{formatPrice(orderData.discount)}</span>
                                            </div>
                                        )}
                                        <Divider />
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span>Total</span>
                                            <span>{formatPrice(orderData.total)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Delivery Information */}
                        <Card>
                            <CardHeader>
                                <h3 className="text-lg font-semibold flex items-center">
                                    <Truck className="w-5 h-5 mr-2" />
                                    Delivery Information
                                </h3>
                            </CardHeader>
                            <CardBody className="pt-0">
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-start space-x-3">
                                            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="font-medium">Shipping Address</p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {orderData.shippingAddress.street}<br />
                                                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state}<br />
                                                    {orderData.shippingAddress.postalCode}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div>
                                        <div className="flex items-start space-x-3">
                                            <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="font-medium">Estimated Delivery</p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {getEstimatedDeliveryDate()}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Standard delivery (5-7 business days)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div>
                                        <div className="flex items-start space-x-3">
                                            <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="font-medium">Payment Method</p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {orderData.paymentMethod}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Contact Information */}
                    <Card className="mb-8">
                        <CardBody>
                            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <p className="text-sm text-gray-600">{orderData.customerInfo.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="font-medium">Phone</p>
                                        <p className="text-sm text-gray-600">{orderData.customerInfo.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Next Steps */}
                    <Card className="mb-8">
                        <CardBody>
                            <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                    <div className="flex items-start space-x-2">
                                        <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <p>We'll send you an email confirmation shortly</p>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <p>Your order will be processed within 24 hours</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-start space-x-2">
                                        <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <p>Track your order using the order ID above</p>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <p>Contact us if you have any questions</p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Action Buttons */}
                    <div className="text-center space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                as={Link}
                                to="/"
                                color="primary"
                                size="lg"
                                startContent={<Home className="w-4 h-4" />}
                            >
                                Continue Shopping
                            </Button>
                            <Button
                                as={Link}
                                to="/products"
                                variant="bordered"
                                size="lg"
                                startContent={<ShoppingBag className="w-4 h-4" />}
                            >
                                Browse Products
                            </Button>
                        </div>
                        <p className="text-sm text-gray-500">
                            Need help? Contact us at{' '}
                            <a href="mailto:support@smarttoolshub.com" className="text-blue-600 hover:underline">
                                support@smarttoolshub.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderSuccessPage;