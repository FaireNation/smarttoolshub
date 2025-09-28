import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Badge,
    Skeleton,
} from "@heroui/react";
import {
    Truck,
    Shield,
    CreditCard,
    Headphones,
    Star,
    ArrowRight,
} from "lucide-react";
import Layout from '../../components/layout/Layout';
import { OptimizedImage } from '../../components/ui';
import { categories } from '../../data/categories';

// Lazy load heavy components to improve First Contentful Paint
const LazyTestimonialsSection = lazy(() => import('./TestimonialsSection'));

const HomePage: React.FC = () => {
    // Color mapping for proper Tailwind CSS classes
    const getFeatureColors = (color: string) => {
        const colorMap = {
            success: {
                bg: 'bg-green-100',
                text: 'text-green-600'
            },
            primary: {
                bg: 'bg-red-100',
                text: 'text-red-600'
            },
            secondary: {
                bg: 'bg-purple-100',
                text: 'text-purple-600'
            },
            warning: {
                bg: 'bg-orange-100',
                text: 'text-orange-600'
            }
        };
        return colorMap[color as keyof typeof colorMap] || colorMap.primary;
    };

    const features = [
        {
            icon: <Truck size={24} aria-hidden="true" />,
            title: "Free Delivery",
            desc: "Free delivery on orders above ₦50,000",
            color: "success" as const,
        },
        {
            icon: <Shield size={24} aria-hidden="true" />,
            title: "Quality Guarantee",
            desc: "All products with manufacturer warranty",
            color: "primary" as const,
        },
        {
            icon: <CreditCard size={24} aria-hidden="true" />,
            title: "Pay on Delivery",
            desc: "Convenient payment when order arrives",
            color: "secondary" as const,
        },
        {
            icon: <Headphones size={24} aria-hidden="true" />,
            title: "Expert Support",
            desc: "Get help choosing the right tools",
            color: "warning" as const,
        },
    ];

    const testimonials = [
        {
            name: "Adeyemi Johnson",
            role: "Construction Manager",
            content: "Excellent quality tools and fast delivery. The pay-on-delivery option made it very convenient.",
            rating: 5,
            avatar: "https://i.pravatar.cc/150?u=1"
        },
        {
            name: "Fatima Abdullahi",
            role: "DIY Enthusiast",
            content: "Great selection of tools at competitive prices. Customer service was very helpful.",
            rating: 5,
            avatar: "https://i.pravatar.cc/150?u=2"
        },
        {
            name: "Chidi Okwu",
            role: "Electrician",
            content: "Professional grade tools that actually last. Will definitely order again.",
            rating: 4,
            avatar: "https://i.pravatar.cc/150?u=3"
        }
    ];

    return (
        <Layout>
            {/* Hero Section - Above the fold content */}
            <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden" aria-label="Welcome section">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" aria-hidden="true" />

                <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Hero Content */}
                        <div className="text-white space-y-6">
                            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                                Professional Tools for{" "}
                                <span className="text-primary-200 bg-gradient-to-r from-primary-200 to-white bg-clip-text text-transparent">
                                    Every Project
                                </span>
                            </h1>

                            <p className="text-xl text-primary-100 leading-relaxed max-w-lg">
                                Discover quality tools from top brands, delivered across Nigeria
                                with our convenient Pay-on-Delivery option.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    as={Link}
                                    to="/products"
                                    size="lg"
                                    className="bg-white text-primary-600 font-semibold hover:bg-primary-50"
                                    endContent={<ArrowRight size={20} aria-hidden="true" />}
                                    aria-label="Shop all products"
                                >
                                    Shop Now
                                </Button>
                                <Button
                                    as={Link}
                                    to="/about"
                                    variant="bordered"
                                    size="lg"
                                    className="border-white text-white font-semibold hover:bg-white/10"
                                    aria-label="Learn more about SmartTools Hub"
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>

                        {/* Hero Image - Optimized with high priority for LCP */}
                        <div className="relative">
                            <div className="relative z-10">
                                <OptimizedImage
                                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
                                    alt="Professional construction tools including drill, hammer, and measuring equipment displayed on a workbench"
                                    className="rounded-2xl shadow-2xl"
                                    width={580}
                                    height={360}
                                    priority={true}
                                    loading="eager"
                                    sizes="(max-width: 768px) 100vw, 580px"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 lg:py-24 bg-content1" aria-labelledby="features-heading">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 id="features-heading" className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                            Why Choose SmartTools Hub?
                        </h2>
                        <p className="text-lg text-default-600 max-w-2xl mx-auto">
                            We're committed to providing the best tools and service experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
                        {features.map((feature, index) => {
                            const colors = getFeatureColors(feature.color);
                            return (
                                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1" role="listitem">
                                    <CardBody className="p-6 text-center">
                                        <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <div className={colors.text}>
                                                {feature.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-small text-default-600">{feature.desc}</p>
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Categories Section - Optimized images */}
            <section className="py-16 lg:py-24 bg-background" aria-labelledby="categories-heading">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 id="categories-heading" className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-lg text-default-600 max-w-2xl mx-auto">
                            Find exactly what you need from our comprehensive collection
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
                        {categories.map((category, index) => {
                            const IconComponent = category.icon;
                            return (
                                <Card
                                    key={category.id}
                                    className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                                    as={Link}
                                    to={`/categories/${category.slug}`}
                                    role="listitem"
                                    aria-label={`Browse ${category.name} - ${category.desc} (${category.count} products)`}
                                >
                                    <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                                        <OptimizedImage
                                            src={category.image}
                                            alt={`${category.name} category featuring various ${category.desc.toLowerCase()}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            width={400}
                                            height={300}
                                            loading={index < 4 ? "eager" : "lazy"}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />
                                        <div className={`absolute inset-0 ${category.color} opacity-80 group-hover:opacity-70 transition-opacity`} aria-hidden="true" />
                                        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                                            <div className="text-white">
                                                <IconComponent size={32} />
                                            </div>
                                        </div>
                                        <Badge
                                            content={category.count}
                                            color="primary"
                                            className="absolute top-4 right-1"
                                            aria-label={`${category.count} products available`}
                                        >
                                            <div className="w-6 h-6" />
                                        </Badge>
                                    </div>
                                    <CardFooter className="flex-col items-start p-4">
                                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-small text-default-600">
                                            {category.desc}
                                        </p>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Lazy-loaded Testimonials Section */}
            <Suspense fallback={
                <section className="py-16 lg:py-24 bg-content1">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <Skeleton className="h-8 w-80 mx-auto mb-4" />
                            <Skeleton className="h-4 w-96 mx-auto" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="p-6">
                                    <Skeleton className="h-4 w-full mb-4" />
                                    <Skeleton className="h-16 w-full mb-4" />
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div>
                                            <Skeleton className="h-4 w-24 mb-1" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            }>
                <LazyTestimonialsSection testimonials={testimonials} />
            </Suspense>

            {/* CTA Section */}
            <section className="py-16 lg:py-20 bg-primary" aria-labelledby="cta-heading">
                <div className="max-w-4xl mx-auto px-4 text-center text-white">
                    <h2 id="cta-heading" className="text-3xl lg:text-4xl font-bold mb-6">
                        Ready to Start Your Next Project?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Browse our extensive collection of professional tools and get them delivered
                        right to your doorstep with our Pay-on-Delivery option.
                    </p>

                    <Button
                        as={Link}
                        to="/products"
                        size="lg"
                        className="bg-white text-primary-600 mt-5 font-semibold hover:bg-primary-50"
                        endContent={<ArrowRight size={20} aria-hidden="true" />}
                        aria-label="Browse all products"
                    >
                        Explore Products
                    </Button>
                </div>
            </section>
        </Layout>
    );
};

export default HomePage;
