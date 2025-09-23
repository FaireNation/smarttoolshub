[![Netlify Status](https://api.netlify.com/api/v1/badges/ae6d418d-06df-47c8-ba51-3a9451041d35/deploy-status)](https://app.netlify.com/projects/smarttoolshub/deploys)

# SmartTools Hub

A modern e-commerce platform for professional tools and hardware, built with React and TypeScript.

## Features

### Frontend
- Modern, responsive design with mobile-first approach
- Product catalog with search, filtering, and category navigation
- Shopping cart with real-time management and quantity controls
- Performance optimized with Vite build tooling

### Core E-commerce Features
- Homepage with hero section and category showcase
- Products page with search, filtering, and product grid
- Shopping cart with add/remove items and order summary
- Planned: Checkout flow, admin portal, and user accounts

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- React Router for navigation
- TailwindCSS for styling
- Lucide React for icons
- Zustand for state management
- Axios for HTTP requests

### Backend (Planned)
- NestJS with TypeScript
- MySQL database
- JWT authentication
- RESTful APIs

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd smarttoolshub
   ```

2. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production
```bash
cd frontend
npm run build
npm run preview
```

## Project Structure

```
smarttoolshub/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Basic UI components (Button, Input, Card)
│   │   │   └── layout/    # Layout components (Header, Footer)
│   │   ├── pages/         # Page components
│   │   │   ├── home/      # Homepage
│   │   │   ├── products/  # Products listing
│   │   │   └── cart/      # Shopping cart
│   │   ├── types/         # TypeScript type definitions
│   │   ├── data/          # Sample data and utilities
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
└── README.md
```

## Application Features

### Homepage
- Hero section with value proposition
- Feature highlights
- Category showcase with product counts
- Professional footer

### Products Page
- Product search and filtering
- Category-based filtering
- Product cards with ratings and pricing
- Stock status management
- Responsive product grid

### Shopping Cart
- Real-time cart updates
- Quantity management
- Order summary with calculations
- Responsive design

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
