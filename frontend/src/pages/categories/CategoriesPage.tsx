import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardFooter,
    Image,
    Badge,
} from "@heroui/react";
import { ArrowRight } from "lucide-react";
import Layout from '../../components/layout/Layout';
import { categories } from '../../data/categories';

const CategoriesPage: React.FC = () => {
    return (
        <Layout>
            {/* Header Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            Product Categories
                        </h1>
                        <p className="text-xl text-default-600 max-w-3xl mx-auto leading-relaxed">
                            Browse our comprehensive collection of professional tools and equipment,
                            organized by category to help you find exactly what you need for your projects.
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories Grid Section */}
            <section className="py-16 lg:py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                                <Card
                                    key={category.id}
                                    className="group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                                    as={Link}
                                    to={`/categories/${category.slug}`}
                                >
                                    <div className="relative overflow-hidden">
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className={`absolute inset-0 ${category.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />

                                        {/* Icon Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-white transform group-hover:scale-125 transition-transform duration-300">
                                                <IconComponent size={48} />
                                            </div>
                                        </div>

                                        {/* Product Count Badge */}
                                        <Badge
                                            content={category.count}
                                            color="primary"
                                            className="absolute top-4 right-1 text-sm font-semibold"
                                        >
                                            <div className="w-6 h-6" />
                                        </Badge>
                                    </div>

                                    <CardFooter className="flex-col items-start p-6 space-y-3">
                                        <div className="flex items-center justify-between w-full">
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                                                {category.name}
                                            </h3>
                                            <ArrowRight
                                                size={20}
                                                className="text-default-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                                            />
                                        </div>

                                        <p className="text-default-600 leading-relaxed">
                                            {category.desc}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm text-default-500">
                                            <span className="font-medium">{category.count} Products</span>
                                            <span>•</span>
                                            <span>View All</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-20 bg-primary">
                <div className="max-w-4xl mx-auto px-4 text-center text-white">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                        Can't Find What You're Looking For?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Our expert team is here to help you find the right tools for your specific needs.
                        Get personalized recommendations and professional advice.
                    </p>

                    <div className="flex  gap-4 mt-5 justify-center">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center button-padding text-lg font-semibold bg-white text-primary-600 rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
                        >
                            Browse All Products
                            <ArrowRight size={20} className="ml-2" />
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center button-padding text-lg font-semibold border-2 border-white text-white rounded-lg hover:bg-black hover:text-white transition-all duration-300"
                        >
                            Contact Expert
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default CategoriesPage;