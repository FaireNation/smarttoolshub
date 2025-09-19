import type { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Power Tools',
    slug: 'power-tools',
    description: 'Electric and battery-powered tools for professionals and DIY enthusiasts',
    image: '/images/categories/power-tools.jpg',
    productCount: 45,
    subcategories: [
      {
        id: '1-1',
        name: 'Drills',
        slug: 'drills',
        parentId: '1',
        productCount: 12
      },
      {
        id: '1-2',
        name: 'Saws',
        slug: 'saws',
        parentId: '1',
        productCount: 8
      },
      {
        id: '1-3',
        name: 'Sanders',
        slug: 'sanders',
        parentId: '1',
        productCount: 6
      }
    ]
  },
  {
    id: '2',
    name: 'Hand Tools',
    slug: 'hand-tools',
    description: 'Essential manual tools for every workshop',
    image: '/images/categories/hand-tools.jpg',
    productCount: 32
  },
  {
    id: '3',
    name: 'Hardware',
    slug: 'hardware',
    description: 'Screws, bolts, fasteners and hardware accessories',
    image: '/images/categories/hardware.jpg',
    productCount: 28
  },
  {
    id: '4',
    name: 'Safety Equipment',
    slug: 'safety-equipment',
    description: 'Personal protective equipment and safety gear',
    image: '/images/categories/safety.jpg',
    productCount: 19
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'DEWALT 20V MAX Cordless Drill/Driver Kit',
    description: 'Powerful 20V MAX cordless drill with LED light, 15 clutch settings, and 2 batteries included. Perfect for drilling and fastening applications.',
    price: 89999, // Price in kobo (NGN 899.99)
    originalPrice: 109999,
    images: [
      '/images/products/dewalt-drill-1.jpg',
      '/images/products/dewalt-drill-2.jpg',
      '/images/products/dewalt-drill-3.jpg'
    ],
    category: 'Power Tools',
    subcategory: 'Drills',
    brand: 'DEWALT',
    inStock: true,
    stockQuantity: 15,
    rating: 4.7,
    reviewCount: 234,
    tags: ['cordless', 'professional', 'battery-included'],
    specifications: {
      'Battery': '20V MAX Lithium Ion',
      'Chuck Size': '1/2 inch',
      'Max Torque': '300 UWO',
      'Speed Settings': '2-speed transmission',
      'LED Light': 'Yes'
    },
    isPopular: true,
    isFeatured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-10')
  },
  {
    id: '2',
    name: 'Makita 18V LXT Circular Saw',
    description: 'Brushless motor circular saw with 6-1/2" blade. Delivers up to 50% longer run time per charge.',
    price: 159999,
    images: [
      '/images/products/makita-saw-1.jpg',
      '/images/products/makita-saw-2.jpg'
    ],
    category: 'Power Tools',
    subcategory: 'Saws',
    brand: 'Makita',
    inStock: true,
    stockQuantity: 8,
    rating: 4.8,
    reviewCount: 142,
    tags: ['brushless', 'cordless', 'professional'],
    specifications: {
      'Battery': '18V LXT Lithium-Ion',
      'Blade Size': '6-1/2 inch',
      'Cutting Capacity': '2-1/4 inch at 90°',
      'Motor': 'Brushless',
      'Weight': '7.3 lbs'
    },
    isPopular: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-05')
  },
  {
    id: '3',
    name: 'Stanley 25-Piece Screwdriver Set',
    description: 'Professional screwdriver set with magnetic tips and comfortable bi-material handles.',
    price: 24999,
    originalPrice: 29999,
    images: [
      '/images/products/stanley-screwdriver-set.jpg'
    ],
    category: 'Hand Tools',
    brand: 'Stanley',
    inStock: true,
    stockQuantity: 25,
    rating: 4.5,
    reviewCount: 89,
    tags: ['screwdrivers', 'magnetic', 'set'],
    specifications: {
      'Pieces': '25',
      'Handle': 'Bi-material grip',
      'Tips': 'Magnetic',
      'Storage': 'Organized rack'
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-28')
  },
  {
    id: '4',
    name: '3M WorkTunes Hearing Protection',
    description: 'Wireless Bluetooth hearing protection with built-in AM/FM radio. Perfect for noisy work environments.',
    price: 79999,
    images: [
      '/images/products/3m-worktunes-1.jpg',
      '/images/products/3m-worktunes-2.jpg'
    ],
    category: 'Safety Equipment',
    brand: '3M',
    inStock: true,
    stockQuantity: 12,
    rating: 4.6,
    reviewCount: 76,
    tags: ['bluetooth', 'radio', 'hearing-protection'],
    specifications: {
      'NRR': '24 dB',
      'Bluetooth': '5.0',
      'Battery Life': '80+ hours',
      'Radio': 'AM/FM',
      'Weight': '13 oz'
    },
    isFeatured: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-03-01')
  },
  {
    id: '5',
    name: 'Bosch Random Orbital Sander',
    description: '5-inch variable speed random orbital sander with dust collection system.',
    price: 119999,
    images: [
      '/images/products/bosch-sander.jpg'
    ],
    category: 'Power Tools',
    subcategory: 'Sanders',
    brand: 'Bosch',
    inStock: false,
    stockQuantity: 0,
    rating: 4.4,
    reviewCount: 54,
    tags: ['variable-speed', 'dust-collection'],
    specifications: {
      'Pad Size': '5 inch',
      'Speed': 'Variable (7,500-12,000 OPM)',
      'Dust Collection': 'Yes',
      'Weight': '2.6 lbs'
    },
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-12')
  },
  {
    id: '6',
    name: 'Milwaukee Tape Measure 25ft',
    description: 'Heavy-duty tape measure with magnetic hook and bold markings for easy reading.',
    price: 34999,
    images: [
      '/images/products/milwaukee-tape.jpg'
    ],
    category: 'Hand Tools',
    brand: 'Milwaukee',
    inStock: true,
    stockQuantity: 30,
    rating: 4.7,
    reviewCount: 123,
    tags: ['magnetic', 'heavy-duty', 'measuring'],
    specifications: {
      'Length': '25 feet',
      'Width': '1 inch',
      'Hook': 'Magnetic',
      'Case': 'Impact resistant'
    },
    isPopular: true,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-02-20')
  }
];

// Helper functions
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getPopularProducts = (): Product[] => {
  return products.filter(product => product.isPopular);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};