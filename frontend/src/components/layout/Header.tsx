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
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react";
import { ShoppingCart, User, Menu, Package, Wrench } from "lucide-react";

const Header: React.FC = () => {
    const location = useLocation();
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
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                            <Wrench size={16} className="text-white" />
                        </div>
                        <span className="font-bold text-lg text-foreground">SmartTools</span>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            {/* Desktop Brand */}
            <NavbarContent className="hidden sm:flex gap-4" justify="start">
                <NavbarBrand>
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                            <Wrench size={20} className="text-white" />
                        </div>
                        <span className="font-bold text-xl text-foreground">SmartToolsHub</span>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            {/* Desktop Navigation */}
            <NavbarContent className="hidden sm:flex gap-6" justify="center">
                {menuItems.map((item) => (
                    <NavbarItem key={item.path} isActive={isActive(item.path)}>
                        <Link
                            to={item.path}
                            className={`font-medium transition-colors ${isActive(item.path)
                                ? "text-primary"
                                : "text-foreground hover:text-primary"
                                }`}
                        >
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {/* Right side actions */}
            <NavbarContent justify="end">
                {/* Shopping cart */}
                <NavbarItem>
                    <Badge content="3" color="secondary" size="sm">
                        <Button
                            as={Link}
                            to="/cart"
                            isIconOnly
                            variant="light"
                            size="sm"
                        >
                            <ShoppingCart size={20} />
                        </Button>
                    </Badge>
                </NavbarItem>

                {/* User menu */}
                <NavbarItem>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button isIconOnly variant="light" size="sm">
                                <User size={20} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="User menu actions">
                            <DropdownItem key="profile" startContent={<User size={16} />}>
                                My Profile
                            </DropdownItem>
                            <DropdownItem key="orders" startContent={<Package size={16} />}>
                                My Orders
                            </DropdownItem>
                            <DropdownItem key="logout" className="text-danger" color="danger">
                                Sign Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
            </NavbarContent>

            {/* Mobile Menu */}
            <NavbarMenu>
                {/* Mobile Menu Items */}
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.name}-${index}`}>
                        <Link
                            className={`w-full text-lg font-medium ${isActive(item.path) ? "text-primary" : "text-foreground"
                                }`}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}

                <NavbarMenuItem>
                    <Button
                        as={Link}
                        to="/products"
                        color="primary"
                        variant="solid"
                        size="lg"
                        className="w-full mt-4 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Shop Now
                    </Button>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
};

export default Header;