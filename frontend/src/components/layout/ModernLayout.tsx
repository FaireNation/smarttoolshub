import React from 'react';
import ModernHeader from './ModernHeader';
import ModernFooter from './ModernFooter';

interface ModernLayoutProps {
    children: React.ReactNode;
    className?: string;
}

const ModernLayout: React.FC<ModernLayoutProps> = ({ children, className = "" }) => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <ModernHeader />
            <main className={`flex-1 ${className}`}>
                {children}
            </main>
            <ModernFooter />
        </div>
    );
};

export default ModernLayout;