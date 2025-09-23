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
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop'
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
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop'
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
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
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
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop'
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
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop'
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
    id: '10',
    name: 'Milwaukee Tape Measure 25ft',
    description: 'Heavy-duty tape measure with magnetic hook and bold markings for easy reading.',
    price: 34999,
    images: [
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop'
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
  },

  // Additional comprehensive products for ModernProductsPage compatibility
  {
    id: '11',
    name: 'Makita 18V LXT Circular Saw',
    description: 'Powerful 18V LXT Lithium-Ion cordless 6-1/2" circular saw with electric brake.',
    price: 159999,
    images: [
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop'
    ],
    category: 'Power Tools',
    brand: 'Makita',
    inStock: true,
    stockQuantity: 8,
    rating: 4.8,
    reviewCount: 142,
    tags: ['circular-saw', '18v', 'cordless', 'brake'],
    specifications: {
      'Blade Size': '6-1/2 inch',
      'Voltage': '18V LXT',
      'Max Cutting Capacity': '2-1/4 inch',
      'Electric Brake': 'Yes'
    },
    isPopular: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: '12',
    name: 'Stanley 25-Piece Screwdriver Set',
    description: 'Professional screwdriver set with cushion grip handles and chrome vanadium steel shanks.',
    price: 24999,
    originalPrice: 29999,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
    ],
    category: 'Hand Tools',
    brand: 'Stanley',
    inStock: true,
    stockQuantity: 45,
    rating: 4.5,
    reviewCount: 98,
    tags: ['screwdriver', 'set', 'professional', 'cushion-grip'],
    specifications: {
      'Piece Count': '25',
      'Handle Type': 'Cushion Grip',
      'Steel Type': 'Chrome Vanadium',
      'Storage': 'Case Included'
    },
    isSale: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-05')
  },
  {
    id: '13',
    name: 'Bosch Professional Impact Driver',
    description: 'Compact and powerful 18V impact driver with brushless motor technology.',
    price: 125999,
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop'
    ],
    category: 'Power Tools',
    brand: 'Bosch',
    inStock: true,
    stockQuantity: 12,
    rating: 4.6,
    reviewCount: 167,
    tags: ['impact-driver', 'brushless', '18v', 'professional'],
    specifications: {
      'Voltage': '18V',
      'Max Torque': '180 Nm',
      'Motor Type': 'Brushless',
      'Chuck': '1/4 inch hex'
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-12')
  },
  {
    id: '14',
    name: 'Milwaukee Heavy-Duty Hammer',
    description: 'Professional grade claw hammer with shock-absorbing handle and magnetic nail holder.',
    price: 18999,
    images: [
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop'
    ],
    category: 'Hand Tools',
    brand: 'Milwaukee',
    inStock: false,
    stockQuantity: 0,
    rating: 4.4,
    reviewCount: 76,
    tags: ['hammer', 'heavy-duty', 'shock-absorbing', 'magnetic'],
    specifications: {
      'Weight': '16 oz',
      'Handle': 'Shock Absorbing',
      'Head': 'Forged Steel',
      'Nail Holder': 'Magnetic'
    },
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-02-18')
  },
  {
    id: '15',
    name: 'DeWalt Safety Hard Hat',
    description: 'ANSI/ISEA Z89.1-2014 Type I compliant hard hat with 4-point ratchet suspension.',
    price: 12999,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'
    ],
    category: 'Safety Equipment',
    brand: 'DEWALT',
    inStock: true,
    stockQuantity: 25,
    rating: 4.3,
    reviewCount: 45,
    tags: ['safety', 'hard-hat', 'ansi', 'ratchet'],
    specifications: {
      'Standard': 'ANSI/ISEA Z89.1-2014 Type I',
      'Suspension': '4-point ratchet',
      'Material': 'High-density polyethylene',
      'Adjustable': 'Yes'
    },
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-02-08')
  },
  {
    id: '16',
    name: 'Klein Tools Electrician Pliers Set',
    description: 'Professional electrician pliers set with insulated handles and precision cutting edges.',
    price: 45999,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
    ],
    category: 'Hand Tools',
    brand: 'Klein Tools',
    inStock: true,
    stockQuantity: 18,
    rating: 4.9,
    reviewCount: 203,
    tags: ['pliers', 'electrician', 'insulated', 'precision'],
    specifications: {
      'Set Includes': '3 pliers',
      'Handle': 'Insulated',
      'Cutting Edge': 'Precision hardened',
      'Voltage Rating': '1000V'
    },
    isPopular: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-02-22')
  },
  {
    id: '17',
    name: 'Ryobi 40V Leaf Blower',
    description: 'Powerful cordless leaf blower with variable speed trigger and lightweight design.',
    price: 79999,
    originalPrice: 99999,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
    ],
    category: 'Power Tools',
    brand: 'Ryobi',
    inStock: true,
    stockQuantity: 10,
    rating: 4.2,
    reviewCount: 87,
    tags: ['leaf-blower', '40v', 'cordless', 'variable-speed'],
    specifications: {
      'Voltage': '40V',
      'Air Speed': '190 MPH',
      'Air Volume': '500 CFM',
      'Weight': '4.5 lbs'
    },
    isSale: true,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-02-14')
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

export const getSaleProducts = (): Product[] => {
  return products.filter(product => product.isSale);
};

export const getInStockProducts = (): Product[] => {
  return products.filter(product => product.inStock);
};

export const getAllCategories = (): string[] => {
  const categorySet = new Set(products.map(product => product.category));
  return Array.from(categorySet).sort();
};

export const getAllBrands = (): string[] => {
  const brandSet = new Set(
    products.map(product => product.brand).filter(brand => brand !== undefined)
  );
  return Array.from(brandSet).sort();
};