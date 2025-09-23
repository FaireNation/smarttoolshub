// Extended cart and order types

export interface CheckoutFormData {
    // Customer Information
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    // Shipping Address
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        lga: string;
        zipCode?: string;
    };

    // Billing Address (optional - can be same as shipping)
    billingAddress?: {
        street: string;
        city: string;
        state: string;
        lga: string;
        zipCode?: string;
        sameAsShipping: boolean;
    };

    // Additional Information
    orderNotes?: string;
    subscribeToNewsletter: boolean;

    // Payment
    paymentMethod: 'pay-on-delivery';
}

export interface OrderItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    image: string;
    brand?: string;
    weight: number;
}

export interface Order {
    id: string;
    orderNumber: string;
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

    // Customer Info
    customer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };

    // Items
    items: OrderItem[];

    // Addresses
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        lga: string;
        zipCode?: string;
    };
    billingAddress?: {
        street: string;
        city: string;
        state: string;
        lga: string;
        zipCode?: string;
    };

    // Pricing
    subtotal: number;
    discount: number;
    discountCode?: string;
    shippingFee: number;
    totalAmount: number;

    // Order Details
    orderDate: string;
    estimatedDelivery: string;
    trackingNumber?: string;
    orderNotes?: string;
    paymentMethod: 'pay-on-delivery';

    // Metadata
    createdAt: number;
    updatedAt: number;
}

export interface CartSummary {
    itemCount: number;
    subtotal: number;
    discount: number;
    shippingFee: number;
    totalAmount: number;
    totalWeight: number;
    savings: number;
    freeShippingThreshold: number;
    freeShippingProgress: number;
    needsForFreeShipping: number;
}

export interface PromoCode {
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    minOrderAmount?: number;
    maxDiscount?: number;
    validFrom: string;
    validUntil: string;
    description: string;
    isActive: boolean;
}

export interface ShippingMethod {
    id: string;
    name: string;
    description: string;
    price: number;
    estimatedDays: number;
    isDefault: boolean;
}

export interface PaymentMethod {
    id: string;
    name: string;
    description: string;
    icon: string;
    isAvailable: boolean;
    processingFee?: number;
}

// Form validation errors
export interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    street?: string;
    city?: string;
    state?: string;
    lga?: string;
    general?: string;
}

// Nigerian states and LGAs for form validation
export interface NigerianLocation {
    state: string;
    lgas: string[];
}

export const NIGERIAN_STATES: NigerianLocation[] = [
    {
        state: "Abia",
        lgas: ["Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato", "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", "Umu Nneochi"]
    },
    {
        state: "Lagos",
        lgas: ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"]
    },
    {
        state: "Kano",
        lgas: ["Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"]
    },
    // Add more states as needed...
];