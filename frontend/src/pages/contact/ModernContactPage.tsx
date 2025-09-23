import React from 'react';
import {
    Card,
    CardBody,
    Chip,
    Divider,
} from "@heroui/react";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    MessageCircle,
    Headphones,
    Shield,
    Truck,
} from "lucide-react";
import ModernLayout from '../../components/layout/ModernLayout';

const ModernContactPage: React.FC = () => {
    const contactInfo = [
        {
            icon: <Phone size={24} />,
            title: "Phone Support",
            details: ["+234 (0) 810 000 0000", "+234 (0) 900 000 0000"],
            description: "Call us during business hours for immediate assistance",
            color: "primary"
        },
        {
            icon: <Mail size={24} />,
            title: "Email Support",
            details: ["support@smarttoolshub.ng", "orders@smarttoolshub.ng"],
            description: "Send us an email and we'll respond within 24 hours",
            color: "success"
        },
        {
            icon: <MapPin size={24} />,
            title: "Visit Our Office",
            details: ["123 Ikeja Industrial Estate", "Lagos, Nigeria"],
            description: "Come see our showroom and speak with our experts",
            color: "secondary"
        },
        {
            icon: <Clock size={24} />,
            title: "Business Hours",
            details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 4:00 PM"],
            description: "Sunday: Closed (Online support available)",
            color: "warning"
        }
    ];

    const features = [
        {
            icon: <Headphones size={20} />,
            title: "Expert Support",
            description: "Professional guidance from tool specialists"
        },
        {
            icon: <Shield size={20} />,
            title: "Quality Guarantee",
            description: "All products backed by manufacturer warranty"
        },
        {
            icon: <Truck size={20} />,
            title: "Fast Response",
            description: "Quick resolution to your queries and concerns"
        }
    ];

    return (
        <ModernLayout>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

                <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28">
                    <div className="text-center text-default-600 space-y-6">
                        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                            Get In Touch
                        </h1>
                        <p className="text-xl text-default-600 leading-relaxed max-w-3xl mx-auto">
                            Have questions about our tools? Need expert advice for your project?
                            We're here to help you find the perfect solution.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                    <div className="text-primary-200">
                                        {feature.icon}
                                    </div>
                                    <span className="text-sm font-medium">{feature.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16 bg-content1">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <Chip color="primary" variant="flat" className="mb-4">Contact Information</Chip>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                            Multiple Ways to Reach Us
                        </h2>
                        <p className="text-lg text-default-600 max-w-2xl mx-auto">
                            Choose the method that works best for you. We're committed to providing excellent customer service.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <CardBody className="p-6 text-center">
                                    <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${info.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                                        info.color === 'success' ? 'bg-success-100 text-success-600' :
                                            info.color === 'secondary' ? 'bg-secondary-100 text-secondary-600' :
                                                info.color === 'warning' ? 'bg-warning-100 text-warning-600' :
                                                    'bg-primary-100 text-primary-600'
                                        }`}>
                                        {info.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                                        {info.title}
                                    </h3>
                                    <div className="space-y-1 mb-3">
                                        {info.details.map((detail, idx) => (
                                            <p key={idx} className="text-small font-medium text-foreground">
                                                {detail}
                                            </p>
                                        ))}
                                    </div>
                                    <p className="text-tiny text-default-600">
                                        {info.description}
                                    </p>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map & Information Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="space-y-12">
                        {/* Map & Additional Info */}
                        <div className="space-y-8">
                            <div>
                                <Chip color="primary" variant="flat" className="mb-4">Find Us</Chip>
                                <h2 className="text-3xl font-bold text-foreground mb-4">
                                    Visit Our Showroom
                                </h2>
                                <p className="text-default-600 mb-6">
                                    See our tools in person and get expert advice from our knowledgeable staff.
                                    We're located in the heart of Lagos' industrial district.
                                </p>
                            </div>

                            {/* Map Placeholder */}
                            <Card className="overflow-hidden shadow-lg">
                                <div className="w-full h-64 bg-gradient-to-br from-default-100 to-default-200 flex items-center justify-center relative">
                                    <div className="text-center">
                                        <MapPin size={48} className="text-primary mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            SmartTools Hub Showroom
                                        </h3>
                                        <p className="text-default-600 text-sm">
                                            123 Ikeja Industrial Estate<br />
                                            Lagos, Nigeria
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Operating Hours */}
                            <Card className="shadow-lg">
                                <CardBody className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-primary-100 text-primary rounded-lg flex items-center justify-center">
                                            <Clock size={20} />
                                        </div>
                                        <h3 className="text-lg font-semibold">Operating Hours</h3>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Monday - Friday</span>
                                            <span className="font-medium">8:00 AM - 6:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Saturday</span>
                                            <span className="font-medium">9:00 AM - 4:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Sunday</span>
                                            <span className="text-default-500">Closed</span>
                                        </div>
                                        <Divider className="my-3" />
                                        <p className="text-tiny text-default-600">
                                            Online support available 24/7 through our website
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-content1">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <Chip color="primary" variant="flat" className="mb-4">Frequently Asked</Chip>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                            Quick Answers
                        </h2>
                        <p className="text-lg text-default-600">
                            Common questions about our services, products, and policies
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardBody className="p-6">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <MessageCircle size={18} className="text-primary" />
                                    What is your return policy?
                                </h3>
                                <p className="text-small text-default-600">
                                    We offer a 30-day return policy for unused items in original packaging.
                                    Contact us for return authorization.
                                </p>
                            </CardBody>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardBody className="p-6">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <Truck size={18} className="text-primary" />
                                    Do you offer installation services?
                                </h3>
                                <p className="text-small text-default-600">
                                    Yes, we provide professional installation services for selected tools
                                    and equipment. Contact us for details.
                                </p>
                            </CardBody>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardBody className="p-6">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <Shield size={18} className="text-primary" />
                                    Are all products genuine?
                                </h3>
                                <p className="text-small text-default-600">
                                    Absolutely! We only sell authentic products directly from manufacturers
                                    or authorized distributors.
                                </p>
                            </CardBody>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardBody className="p-6">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <Phone size={18} className="text-primary" />
                                    How fast is your response time?
                                </h3>
                                <p className="text-small text-default-600">
                                    We respond to emails within 24 hours and phone calls during business
                                    hours are answered immediately.
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </section>
        </ModernLayout>
    );
};

export default ModernContactPage;