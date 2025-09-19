import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  cartItemsCount?: number;
}

const Layout: React.FC<LayoutProps> = ({ children, cartItemsCount }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemsCount={cartItemsCount} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;