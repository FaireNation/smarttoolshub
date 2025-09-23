import React from 'react';
import {
    Card,
    CardBody,
    Image,
    Chip,
} from "@heroui/react";
import {
    Users,
    Award,
    MapPin,
    Clock,
    Shield,
    Truck,
    Star,
    Target,
    CheckCircle,
} from "lucide-react";
import Layout from '../../components/layout/Layout';

const AboutPage: React.FC = () => {
    const stats = [
        { number: "10,000+", label: "Happy Customers", icon: <Users size={24} /> },
        { number: "5,000+", label: "Products Sold", icon: <Award size={24} /> },
        { number: "36", label: "States Covered", icon: <MapPin size={24} /> },
        { number: "5", label: "Years Experience", icon: <Clock size={24} /> },
    ];

    const values = [
        {
            icon: <Shield size={32} />,
            title: "Quality Assurance",
            description: "Every product undergoes rigorous quality checks to ensure you receive only the best tools for your projects."
        },
        {
            icon: <Truck size={32} />,
            title: "Reliable Delivery",
            description: "Fast and secure delivery across Nigeria with our pay-on-delivery option for your convenience."
        },
        {
            icon: <Star size={32} />,
            title: "Customer First",
            description: "Your satisfaction is our priority. We provide exceptional customer service and support at every step."
        },
        {
            icon: <Target size={32} />,
            title: "Innovation",
            description: "We continuously seek the latest tools and technologies to keep your projects ahead of the curve."
        },
    ];

    const milestones = [
        {
            year: "2019",
            event: "SmartTools Hub founded in Lagos",
            description: "Started with a vision to make professional tools accessible across Nigeria",
            icon: <Star size={24} />,
            color: "primary"
        },
        {
            year: "2020",
            event: "Expanded to 10 states across Nigeria",
            description: "Built our distribution network to serve customers nationwide",
            icon: <MapPin size={24} />,
            color: "success"
        },
        {
            year: "2021",
            event: "Launched Pay-on-Delivery service",
            description: "Revolutionary service that changed how Nigerians buy tools online",
            icon: <Truck size={24} />,
            color: "secondary"
        },
        {
            year: "2022",
            event: "Reached 5,000+ satisfied customers",
            description: "Milestone achievement in customer satisfaction and trust",
            icon: <Users size={24} />,
            color: "warning"
        },
        {
            year: "2023",
            event: "Opened regional distribution centers",
            description: "Faster delivery times with strategically located warehouses",
            icon: <Shield size={24} />,
            color: "primary"
        },
        {
            year: "2024",
            event: "Launched online platform nationwide",
            description: "Complete digital transformation with enhanced user experience",
            icon: <Award size={24} />,
            color: "success"
        },
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

                <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28">
                    <div className="text-center dark:from-blue-950 dark:to-indigo-950 space-y-6">
                        <h1 className="text-4xl lg:text-6xl font-bold">
                            About SmartTools Hub
                        </h1>
                        <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                            Your trusted partner for professional tools and equipment across Nigeria.
                            We're committed to empowering professionals and DIY enthusiasts with
                            quality tools that get the job done right.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-content1">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardBody className="p-6">
                                    <div className="text-primary mb-4 flex justify-center">
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-3xl font-bold text-foreground mb-2">
                                        {stat.number}
                                    </h3>
                                    <p className="text-default-600">{stat.label}</p>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div>
                                <Chip color="primary" variant="flat" className="mb-4">Our Story</Chip>
                                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                                    Building Nigeria's Premier Tool Marketplace
                                </h2>
                            </div>

                            <p className="text-lg text-default-600 leading-relaxed">
                                Founded in 2019, SmartTools Hub began with a simple mission: to make
                                professional-grade tools accessible to everyone across Nigeria. What started
                                as a small operation in Lagos has grown into the country's most trusted
                                online tool marketplace.
                            </p>

                            <p className="text-lg text-default-600 leading-relaxed">
                                We understand the challenges faced by professionals, contractors, and
                                DIY enthusiasts in finding quality tools. That's why we've built strong
                                relationships with leading manufacturers and brands to bring you the
                                best products at competitive prices.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="flex items-center gap-2 text-success">
                                    <CheckCircle size={20} />
                                    <span className="font-medium">Authentic Products Only</span>
                                </div>
                                <div className="flex items-center gap-2 text-success">
                                    <CheckCircle size={20} />
                                    <span className="font-medium">Warranty Guaranteed</span>
                                </div>
                                <div className="flex items-center gap-2 text-success">
                                    <CheckCircle size={20} />
                                    <span className="font-medium">Expert Support</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <Image
                                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
                                alt="Our warehouse and team"
                                className="rounded-2xl shadow-xl"
                                width={580}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 lg:py-24 bg-content1">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <Chip color="primary" variant="flat" className="mb-4">Our Values</Chip>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                            What Drives Us Forward
                        </h2>
                        <p className="text-lg text-default-600 max-w-2xl mx-auto">
                            Our core values guide every decision we make and every service we provide
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                                <CardBody className="p-8">
                                    <div className="text-primary mb-6 group-hover:scale-110 transition-transform">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-4">
                                        {value.title}
                                    </h3>
                                    <p className="text-default-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Journey - Redesigned */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <Chip color="primary" variant="flat" className="mb-4">Our Journey</Chip>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                            From Vision to Reality
                        </h2>
                        <p className="text-lg text-default-600 max-w-2xl mx-auto">
                            Every great company has a story. Here's how we built Nigeria's most trusted tool marketplace, one milestone at a time.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {milestones.map((milestone, index) => (
                            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <CardBody className="p-8 text-center">
                                    <div className="mb-6">
                                        <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110 ${milestone.color === 'primary' ? 'bg-[#f3e8d8] text-primary' :
                                            milestone.color === 'success' ? 'bg-success-100 text-success-600' :
                                                milestone.color === 'secondary' ? 'bg-secondary-100 text-secondary-600' :
                                                    milestone.color === 'warning' ? 'bg-warning-100 text-warning-600' :
                                                        'to-indigo-100 text-primary-600'
                                            }`}>
                                            {milestone.icon}
                                        </div>
                                        <Chip
                                            color={milestone.color as any}
                                            variant="solid"
                                            className="font-bold text-sm"
                                        >
                                            {milestone.year}
                                        </Chip>
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                        {milestone.event}
                                    </h3>

                                    <p className="text-default-600 text-sm leading-relaxed">
                                        {milestone.description}
                                    </p>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AboutPage;