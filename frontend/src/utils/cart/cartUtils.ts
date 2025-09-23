// Cart-specific utilities and helpers

export const CART_STORAGE_KEY = 'smarttools_cart';
export const ORDER_HISTORY_KEY = 'smarttools_orders';
export const FREE_SHIPPING_THRESHOLD = 5000000; // ₦50,000 in kobo
export const DEFAULT_SHIPPING_FEE = 500000; // ₦5,000 in kobo

// Price formatting utility
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    }).format(price / 100);
};

// Format price without currency symbol
export const formatPriceValue = (price: number): string => {
    return new Intl.NumberFormat('en-NG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price / 100);
};

// Generate unique order ID
export const generateOrderId = (): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `STH-${timestamp}-${random}`;
};

// Calculate savings
export const calculateSavings = (originalPrice: number, currentPrice: number, quantity: number = 1): number => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return (originalPrice - currentPrice) * quantity;
};

// Get discount percentage
export const getDiscountPercentage = (originalPrice: number, currentPrice: number): number => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Validate Nigerian phone number
export const validateNigerianPhone = (phone: string): boolean => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Check if it's a valid Nigerian phone number
    // Format: +234XXXXXXXXXX, 234XXXXXXXXXX, 0XXXXXXXXXX
    if (cleaned.length === 13 && cleaned.startsWith('234')) {
        return true;
    }
    if (cleaned.length === 11 && cleaned.startsWith('0')) {
        return true;
    }

    return false;
};

// Format Nigerian phone number
export const formatNigerianPhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 11 && cleaned.startsWith('0')) {
        // Format: 0XXXXXXXXXX to +234XXXXXXXXXX
        return `+234${cleaned.substr(1)}`;
    }
    if (cleaned.length === 13 && cleaned.startsWith('234')) {
        return `+${cleaned}`;
    }

    return phone;
};

// Calculate estimated delivery date
export const calculateDeliveryDate = (state: string, city: string): Date => {
    const now = new Date();
    let deliveryDays = 3; // Default delivery time

    // Major cities get faster delivery
    const majorCities = ['lagos', 'abuja', 'kano', 'ibadan', 'port harcourt', 'benin city', 'kaduna'];
    const isMainCity = majorCities.some(majorCity =>
        city.toLowerCase().includes(majorCity)
    );

    // Check state for remote areas
    const remoteStates = ['borno', 'yobe', 'adamawa', 'taraba', 'gombe', 'bauchi'];
    const isRemoteState = remoteStates.some(remoteState =>
        state.toLowerCase().includes(remoteState)
    );

    if (isMainCity) {
        deliveryDays = 2;
    } else if (isRemoteState) {
        deliveryDays = 5;
    } else {
        // Remote cities might take longer
        const remoteCities = ['maiduguri', 'yola', 'gombe', 'bauchi'];
        const isRemoteCity = remoteCities.some(remoteCity =>
            city.toLowerCase().includes(remoteCity)
        );

        if (isRemoteCity) {
            deliveryDays = 5;
        }
    }

    const deliveryDate = new Date(now);
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

    return deliveryDate;
};

// Format delivery date
export const formatDeliveryDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-NG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};

// Cart item weight calculation (for shipping)
export const calculateItemWeight = (productName: string): number => {
    // Simple weight estimation based on product type
    const name = productName.toLowerCase();

    if (name.includes('drill') || name.includes('saw') || name.includes('grinder')) {
        return 2000; // 2kg for power tools
    }
    if (name.includes('hammer') || name.includes('wrench') || name.includes('pliers')) {
        return 500; // 0.5kg for hand tools
    }
    if (name.includes('screw') || name.includes('nail') || name.includes('bolt')) {
        return 100; // 0.1kg for hardware
    }
    if (name.includes('helmet') || name.includes('glove') || name.includes('safety')) {
        return 300; // 0.3kg for safety equipment
    }

    return 1000; // Default 1kg
};

// Shipping cost calculation based on weight and location
export const calculateShippingCost = (totalWeight: number, state: string, subtotal: number): number => {
    // Free shipping above threshold
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        return 0;
    }

    let baseCost = DEFAULT_SHIPPING_FEE;

    // Adjust based on location
    const state_lower = state.toLowerCase();
    const remoteStates = ['borno', 'yobe', 'adamawa', 'taraba', 'gombe', 'bauchi'];
    const isRemoteState = remoteStates.some(remote => state_lower.includes(remote));

    if (isRemoteState) {
        baseCost = Math.round(baseCost * 1.5); // 50% more for remote areas
    }

    // Adjust based on weight (every additional kg adds ₦500)
    const additionalWeight = Math.max(0, totalWeight - 1000); // First 1kg is free
    const weightCharge = Math.ceil(additionalWeight / 1000) * 50000; // ₦500 per additional kg

    return baseCost + weightCharge;
};

// Local storage helpers with error handling
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage for key ${key}:`, error);
        return defaultValue;
    }
};

export const saveToStorage = <T>(key: string, value: T): boolean => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error saving to localStorage for key ${key}:`, error);
        return false;
    }
};

export const removeFromStorage = (key: string): boolean => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing from localStorage for key ${key}:`, error);
        return false;
    }
};

// Promo code validation
export const validatePromoCode = (code: string): { valid: boolean; discount: number; message: string } => {
    const validCodes = {
        'SAVE10': { discount: 1000000, message: 'Save ₦10,000 on your order!' }, // ₦10,000 off
        'WELCOME5': { discount: 500000, message: 'Welcome! Save ₦5,000 on your first order!' }, // ₦5,000 off
        'TOOLS20': { discount: 0.2, message: 'Get 20% off all tools!' }, // 20% off
    };

    const upperCode = code.toUpperCase();

    if (validCodes[upperCode as keyof typeof validCodes]) {
        return {
            valid: true,
            discount: validCodes[upperCode as keyof typeof validCodes].discount,
            message: validCodes[upperCode as keyof typeof validCodes].message,
        };
    }

    return {
        valid: false,
        discount: 0,
        message: 'Invalid promo code.',
    };
};

// Apply discount to cart total
export const applyDiscount = (subtotal: number, discountCode: string): number => {
    const promoResult = validatePromoCode(discountCode);

    if (!promoResult.valid) return 0;

    // If discount is less than 1, treat as percentage
    if (promoResult.discount < 1) {
        return Math.round(subtotal * promoResult.discount);
    }

    // Otherwise, treat as fixed amount
    return Math.min(promoResult.discount, subtotal);
};