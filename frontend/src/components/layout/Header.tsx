import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Button,
    Badge,
} from "@heroui/react";
import { ShoppingCart, Menu, Wrench } from "lucide-react";
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
    const location = useLocation();
    const { cart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Categories", path: "/categories" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header role="banner">
            <Navbar
                onMenuOpenChange={setIsMenuOpen}
                isMenuOpen={isMenuOpen}
                maxWidth="xl"
                className="border-b border-divider bg-background/70 backdrop-blur-xl"
                height="4rem"
            >
                {/* Mobile menu toggle */}
                <NavbarContent className="sm:hidden">
                    <NavbarMenuToggle
                        icon={<Menu size={20} />}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    />
                </NavbarContent>

                {/* Brand/Logo */}
                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <Link
                            to="/"
                            className="flex items-center space-x-2"
                            aria-label="SmartTools - Go to homepage"
                        >
                            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                                <Wrench size={16} className="text-white" aria-hidden="true" />
                            </div>
                            <span className="font-bold text-lg text-foreground">SmartTools</span>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                {/* Desktop Brand */}
                <NavbarContent className="hidden sm:flex gap-4" justify="start">
                    <NavbarBrand>
                        <Link
                            to="/"
                            className="flex items-center space-x-3"
                            aria-label="SmartToolsHub - Go to homepage"
                        >
                            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                                <Wrench size={20} className="text-white" aria-hidden="true" />
                            </div>
                            <span className="font-bold text-xl text-foreground">SmartToolsHub</span>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                {/* Desktop Navigation */}
                <nav role="navigation" aria-label="Main navigation">
                    <NavbarContent className="hidden sm:flex gap-6" justify="center">
                        {menuItems.map((item) => (
                            <NavbarItem key={item.path} isActive={isActive(item.path)}>
                                <Link
                                    to={item.path}
                                    className={`font-medium transition-colors ${isActive(item.path)
                                        ? "text-primary"
                                        : "text-foreground hover:text-primary"
                                        }`}
                                    aria-current={isActive(item.path) ? "page" : undefined}
                                >
                                    {item.name}
                                </Link>
                            </NavbarItem>
                        ))}
                    </NavbarContent>
                </nav>

                {/* Right side actions */}
                <NavbarContent justify="end">
                    {/* Shopping cart */}
                    <NavbarItem>
                        <Badge
                            content={cart.totalItems > 0 ? cart.totalItems.toString() : ""}
                            color="secondary"
                            size="sm"
                            isInvisible={cart.totalItems === 0}
                        >
                            <Button
                                as={Link}
                                to="/cart"
                                isIconOnly
                                variant="light"
                                size="sm"
                                aria-label={`Shopping cart${cart.totalItems > 0 ? ` (${cart.totalItems} items)` : ' (empty)'}`}
                            >
                                <ShoppingCart size={20} aria-hidden="true" />
                            </Button>
                        </Badge>
                    </NavbarItem>
                </NavbarContent>

                {/* Mobile Menu */}
                <NavbarMenu role="menu" aria-label="Mobile navigation menu">
                    {/* Mobile Menu Items */}
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item.name}-${index}`} role="menuitem">
                            <Link
                                className={`w-full text-lg font-medium ${isActive(item.path) ? "text-primary" : "text-foreground"
                                    }`}
                                to={item.path}
                                onClick={() => setIsMenuOpen(false)}
                                aria-current={isActive(item.path) ? "page" : undefined}
                            >
                                {item.name}
                            </Link>
                        </NavbarMenuItem>
                    ))}

                    <NavbarMenuItem role="menuitem">
                        <Button
                            as={Link}
                            to="/products"
                            color="primary"
                            size="lg"
                            className="w-full mt-4"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Shop All Products
                        </Button>
                    </NavbarMenuItem>
                </NavbarMenu>
            </Navbar>
        </header>
    );
};

export default Header;
