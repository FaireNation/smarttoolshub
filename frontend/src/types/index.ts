export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  specifications?: { [key: string]: string };
  isPopular?: boolean;
  isFeatured?: boolean;
  isSale?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  subcategories?: Category[];
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: { [key: string]: string };
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: Address[];
  orders: Order[];
  createdAt: Date;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  lga: string; // Local Government Area for Nigeria
  zipCode?: string;
  isDefault: boolean;
  type: 'billing' | 'shipping';
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'pay-on-delivery';
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  shippingFee: number;
  total: number;
  orderDate: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'customer' | 'admin';
  profile: Customer;
}

// Nigerian States and LGAs data structure
export interface NigerianState {
  name: string;
  code: string;
  lgas: string[];
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface FilterOptions {
  categories?: string[];
  priceRange?: [number, number];
  brands?: string[];
  rating?: number;
  inStock?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'popularity' | 'newest';
  search?: string;
}