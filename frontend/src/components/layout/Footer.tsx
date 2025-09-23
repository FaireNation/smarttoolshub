import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Card, CardBody } from "@heroui/react";
import {
    Wrench,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    ArrowRight,
} from "lucide-react";
import { categories } from '../../data/categories';

const Footer: React.FC = () => {
    return (
        <footer className="relative overflow-hidden pt-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10"></div>
            <div className="absolute inset-0 bg-content1/95 backdrop-blur-sm"></div>

            {/* Main Footer Content */}
            <div className="relative max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Section - Takes 2 columns */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-lg">
                                <Wrench size={24} className="text-white" />
                            </div>
                            <span className="font-bold text-2xl text-foreground">SmartToolsHub</span>
                        </div>

                        <p className="text-default-600 leading-relaxed max-w-md">
                            Nigeria's premier destination for professional tools and hardware.
                            We empower craftsmen, contractors, and DIY enthusiasts with quality tools
                            and exceptional service across the nation.
                        </p>

                        {/* Social Media */}
                        <div className="flex space-x-3 pt-4">
                            <Button isIconOnly size="lg" variant="flat" className="bg-default-100 hover:bg-primary hover:text-white transition-colors">
                                <Facebook size={20} />
                            </Button>
                            <Button isIconOnly size="lg" variant="flat" className="bg-default-100 hover:bg-primary hover:text-white transition-colors">
                                <Twitter size={20} />
                            </Button>
                            <Button isIconOnly size="lg" variant="flat" className="bg-default-100 hover:bg-primary hover:text-white transition-colors">
                                <Instagram size={20} />
                            </Button>
                            <Button isIconOnly size="lg" variant="flat" className="bg-default-100 hover:bg-primary hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { name: "All Products", path: "/products" },
                                { name: "About Us", path: "/about" },
                                { name: "Contact", path: "/contact" },
                            ].map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-default-600 hover:text-primary transition-colors font-medium flex items-center group"
                                    >
                                        <span>{link.name}</span>
                                        <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground text-lg mb-6">Categories</h4>
                        <ul className="space-y-3">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        to={`/categories/${category.slug}`}
                                        className="text-default-600 hover:text-primary transition-colors font-medium flex items-center justify-between group"
                                    >
                                        <span>{category.name}</span>
                                        <span className="text-xs bg-default-100 text-default-500 px-2 py-1 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                                            {category.count}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground text-lg mb-6">Get In Touch</h4>
                        <div className="space-y-4">
                            <Card className="bg-default-50 border-none shadow-sm">
                                <CardBody className="p-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0 mt-0.5">
                                            <MapPin size={16} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground text-sm">Location</p>
                                            <p className="text-default-600 text-sm">Lagos, Nigeria</p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card className="bg-default-50 border-none shadow-sm">
                                <CardBody className="p-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-lg flex-shrink-0 mt-0.5">
                                            <Mail size={16} className="text-warning" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground text-sm">Email</p>
                                            <p className="text-default-600 text-sm">support@smarttoolshub.com</p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Bottom Section */}
            <div className="relative max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-sm mt-4 text-default-600">
                        <p className="flex items-center gap-2">
                            © 2025 SmartToolsHub.
                            <span className="flex items-center gap-1">
                                Made by FaireNation Limited
                            </span>
                        </p>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-divider">
                </div>
            </div>
        </footer>
    );
};

export default Footer;