# SmartTools Hub 🔧

A modern, full-stack e-commerce platform for professional tools and hardware, built with React (TypeScript) and NestJS, focusing on the Nigerian market.

![SmartTools Hub Homepage](https://github.com/user-attachments/assets/25e0fc10-6e4d-43f6-8c1d-af3d8847abbb)

## 🌟 Features

### Frontend (React + TypeScript)
- **Modern, Responsive Design** - Professional UI with mobile-first approach
- **Product Catalog** - Advanced filtering, search, and category navigation
- **Shopping Cart** - Real-time cart management with quantity controls
- **Nigerian Market Focus** - Pay-on-Delivery, Naira currency, local shipping
- **Performance Optimized** - Built with Vite for fast development and builds

### Core E-commerce Features
- ✅ **Homepage** - Hero section, features, categories showcase
- ✅ **Products Page** - Search, filtering, product grid with ratings and pricing
- ✅ **Shopping Cart** - Add/remove items, quantity management, order summary
- 🚧 **Checkout Flow** - Nigerian address system (State/LGA), Pay-on-Delivery
- 🚧 **Admin Portal** - Product and order management
- 🚧 **User Accounts** - Registration, login, order history

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **Custom CSS** with responsive design
- **Lucide React** for icons

### Backend (Planned)
- **NestJS** with TypeScript
- **MySQL** database
- **JWT** authentication
- **RESTful APIs**

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/FaireNation/smarttoolshub.git
   cd smarttoolshub
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
smarttoolshub/
├── backend/                 # NestJS backend (coming soon)
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

## 💰 Nigerian E-commerce Features

- **Pay-on-Delivery** - No upfront payment required
- **Nigerian Naira (₦)** - All prices in local currency
- **Free Shipping** - On orders above ₦50,000
- **Local Delivery** - Delivery across Nigeria
- **State/LGA System** - Nigerian address format support

## 🎨 Design System

The application uses a modern, professional design system with:
- **Clean Color Palette** - Blue primary with gray accents
- **Consistent Typography** - Inter font family
- **Responsive Grid** - Mobile-first layout
- **Interactive Elements** - Hover effects and transitions
- **Accessibility** - ARIA labels and keyboard navigation

## 📱 Pages

### Homepage
- Hero section with compelling value proposition
- Feature highlights (Free Delivery, Quality Guarantee, Pay-on-Delivery)
- Category showcase with product counts
- Professional footer with company information

### Products Page  
- Advanced product search and filtering
- Category-based filtering
- Product cards with ratings, pricing, and sale indicators
- Stock status management
- Responsive product grid

### Shopping Cart
- Real-time cart updates
- Quantity management with +/- controls
- Order summary with shipping calculations
- Free shipping progress indicator
- Pay-on-Delivery messaging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern React and TypeScript best practices
- Designed for the Nigerian e-commerce market
- Professional tools and hardware focus
- Pay-on-Delivery integration ready

## 📞 Contact

- **Website**: [smarttoolshub.ng](https://smarttoolshub.ng) (coming soon)
- **Email**: info@smarttoolshub.ng
- **Phone**: +234 803 123 4567

---

**SmartTools Hub** - *Professional Tools for Every Project* 🔧
