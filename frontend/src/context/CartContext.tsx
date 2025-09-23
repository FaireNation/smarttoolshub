import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '../types';

// Enhanced CartItem interface for local storage
export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
    addedAt: number;
}

export interface Cart {
    items: CartItem[];
    totalItems: number;
    totalAmount: number;
    subtotal: number;
    shippingFee: number;
    discount: number;
}

type CartAction =
    | { type: 'ADD_TO_CART'; product: Product; quantity?: number }
    | { type: 'REMOVE_FROM_CART'; productId: string }
    | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
    | { type: 'CLEAR_CART' }
    | { type: 'APPLY_DISCOUNT'; amount: number }
    | { type: 'SET_SHIPPING_FEE'; fee: number }
    | { type: 'LOAD_CART'; cart: Cart };

interface CartContextType {
    cart: Cart;
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    applyDiscount: (amount: number) => void;
    isInCart: (productId: string) => boolean;
    getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'smarttools_cart';
const FREE_SHIPPING_THRESHOLD = 5000000; // ₦50,000 in kobo
const SHIPPING_FEE = 500000; // ₦5,000 in kobo

// Calculate totals helper
const calculateTotals = (items: CartItem[], discount = 0, shippingFee = 0) => {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const totalItems = items.length; // Number of unique items, not total quantity
    const totalAmount = subtotal - discount + shippingFee;

    return {
        subtotal,
        totalItems,
        totalAmount,
        discount,
        shippingFee: subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : shippingFee,
    };
};

// Cart reducer
const cartReducer = (state: Cart, action: CartAction): Cart => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItemIndex = state.items.findIndex(
                item => item.product.id === action.product.id
            );

            let newItems: CartItem[];
            if (existingItemIndex !== -1) {
                // Update existing item quantity
                newItems = state.items.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + (action.quantity || 1) }
                        : item
                );
            } else {
                // Add new item
                newItems = [
                    ...state.items,
                    {
                        id: `${action.product.id}_${Date.now()}`,
                        product: action.product,
                        quantity: action.quantity || 1,
                        addedAt: Date.now(),
                    },
                ];
            }

            const totals = calculateTotals(newItems, state.discount, SHIPPING_FEE);
            return {
                items: newItems,
                ...totals,
                discount: state.discount,
            };
        }

        case 'REMOVE_FROM_CART': {
            const newItems = state.items.filter(item => item.product.id !== action.productId);
            const totals = calculateTotals(newItems, state.discount, SHIPPING_FEE);
            return {
                items: newItems,
                ...totals,
                discount: state.discount,
            };
        }

        case 'UPDATE_QUANTITY': {
            if (action.quantity <= 0) {
                return cartReducer(state, { type: 'REMOVE_FROM_CART', productId: action.productId });
            }

            const newItems = state.items.map(item =>
                item.product.id === action.productId
                    ? { ...item, quantity: action.quantity }
                    : item
            );

            const totals = calculateTotals(newItems, state.discount, SHIPPING_FEE);
            return {
                items: newItems,
                ...totals,
                discount: state.discount,
            };
        }

        case 'CLEAR_CART': {
            return {
                items: [],
                totalItems: 0,
                totalAmount: 0,
                subtotal: 0,
                shippingFee: 0,
                discount: 0,
            };
        }

        case 'APPLY_DISCOUNT': {
            const totals = calculateTotals(state.items, action.amount, SHIPPING_FEE);
            return {
                ...state,
                ...totals,
            };
        }

        case 'SET_SHIPPING_FEE': {
            const totals = calculateTotals(state.items, state.discount, action.fee);
            return {
                ...state,
                ...totals,
            };
        }

        case 'LOAD_CART': {
            return action.cart;
        }

        default:
            return state;
    }
};

// Initial cart state
const initialCart: Cart = {
    items: [],
    totalItems: 0,
    totalAmount: 0,
    subtotal: 0,
    shippingFee: 0,
    discount: 0,
};

// Load cart from localStorage
const loadCartFromStorage = (): Cart => {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            const parsedCart = JSON.parse(stored);
            // Recalculate totals to ensure consistency
            const totals = calculateTotals(parsedCart.items || [], parsedCart.discount || 0, SHIPPING_FEE);
            return {
                items: parsedCart.items || [],
                ...totals,
                discount: parsedCart.discount || 0,
            };
        }
    } catch (error) {
        console.error('Error loading cart from storage:', error);
    }
    return initialCart;
};

// Save cart to localStorage
const saveCartToStorage = (cart: Cart) => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to storage:', error);
    }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    // Load cart from localStorage on mount
    useEffect(() => {
        const storedCart = loadCartFromStorage();
        if (storedCart.items.length > 0) {
            dispatch({ type: 'LOAD_CART', cart: storedCart });
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (cart.items.length > 0 || cart.totalItems > 0) {
            saveCartToStorage(cart);
        }
    }, [cart]);

    const addToCart = (product: Product, quantity = 1) => {
        dispatch({ type: 'ADD_TO_CART', product, quantity });
    };

    const removeFromCart = (productId: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', productId });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
        localStorage.removeItem(CART_STORAGE_KEY);
    };

    const applyDiscount = (amount: number) => {
        dispatch({ type: 'APPLY_DISCOUNT', amount });
    };

    const isInCart = (productId: string): boolean => {
        return cart.items.some(item => item.product.id === productId);
    };

    const getItemQuantity = (productId: string): number => {
        const item = cart.items.find(item => item.product.id === productId);
        return item ? item.quantity : 0;
    };

    const contextValue: CartContextType = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyDiscount,
        isInCart,
        getItemQuantity,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Additional hooks for convenience
export const useCartItem = (productId: string) => {
    const { cart, updateQuantity, removeFromCart } = useCart();
    const item = cart.items.find(item => item.product.id === productId);

    return {
        item,
        quantity: item?.quantity || 0,
        isInCart: !!item,
        updateQuantity: (quantity: number) => updateQuantity(productId, quantity),
        removeFromCart: () => removeFromCart(productId),
    };
};

export const useCartSummary = () => {
    const { cart } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
        }).format(price / 100);
    };

    return {
        ...cart,
        subtotalFormatted: formatPrice(cart.subtotal),
        shippingFeeFormatted: formatPrice(cart.shippingFee),
        discountFormatted: formatPrice(cart.discount),
        totalAmountFormatted: formatPrice(cart.totalAmount),
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress: Math.min((cart.subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100),
        needsAmountForFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - cart.subtotal),
    };
};