import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
    Button,
    Select,
    SelectItem,
    Pagination,
    Breadcrumbs,
    BreadcrumbItem,
} from "@heroui/react";
import {
    ArrowLeft,
} from "lucide-react";
import ModernLayout from '../../components/layout/ModernLayout';
import ModernProductCard from '../../components/ModernProductCard';
import { categories } from '../../data/categories';
import { products } from '../../data/products';

type SortOption = 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';

const ModernCategoryPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [sortBy, setSortBy] = useState<SortOption>('name');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Find the current category
    const currentCategory = categories.find(cat => cat.slug === slug);

    // Filter products by category
    const categoryProducts = useMemo(() => {
        if (!currentCategory) return [];
        return products.filter(product =>
            product.category.toLowerCase().replace(/\s+/g, '-') === slug
        );
    }, [currentCategory, slug]);

    // Sort products
    const sortedProducts = useMemo(() => {
        const sorted = [...categoryProducts];
        switch (sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'newest':
                return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            case 'name':
            default:
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
        }
    }, [categoryProducts, sortBy]);

    // Paginate products
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedProducts.slice(startIndex, endIndex);
    }, [sortedProducts, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    // If category not found, redirect to categories page
    if (!currentCategory) {
        return <Navigate to="/categories" replace />;
    }

    const IconComponent = currentCategory.icon;

    return (
        <ModernLayout>
            {/* Breadcrumbs */}
            <section className="py-6 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 border-b">
                <div className="max-w-7xl mx-auto px-4">
                    <Breadcrumbs>
                        <BreadcrumbItem>
                            <Link to="/">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/categories">Categories</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>{currentCategory.name}</BreadcrumbItem>
                    </Breadcrumbs>
                </div>
            </section>

            {/* Category Header */}
            <section className="py-12 lg:py-16 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Category Icon & Info */}
                        <div className="text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                                <div className={`w-16 h-16 rounded-2xl ${currentCategory.color} flex items-center justify-center`}>
                                    <IconComponent size={32} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                                        {currentCategory.name}
                                    </h1>
                                    <p className="text-default-600">
                                        {currentCategory.count} Products Available
                                    </p>
                                </div>
                            </div>
                            <p className="text-lg text-default-700 max-w-2xl leading-relaxed">
                                {currentCategory.desc}
                            </p>
                        </div>

                        {/* Back Button */}
                        <div className="lg:ml-auto">
                            <Button
                                as={Link}
                                to="/categories"
                                variant="bordered"
                                startContent={<ArrowLeft size={16} />}
                                className="font-medium"
                            >
                                Back to Categories
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-8 lg:py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <span className="text-default-600 font-medium">
                                {sortedProducts.length} Products
                            </span>
                            {sortedProducts.length > 0 && (
                                <span className="text-sm text-default-500">
                                    Page {currentPage} of {totalPages}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Sort Dropdown */}
                            <Select
                                size="sm"
                                placeholder="Sort by"
                                selectedKeys={new Set([sortBy])}
                                className="w-40"
                                onSelectionChange={(keys) => {
                                    const selected = Array.from(keys)[0] as SortOption;
                                    setSortBy(selected);
                                }}
                            >
                                <SelectItem key="name">Name A-Z</SelectItem>
                                <SelectItem key="price-low">Price: Low to High</SelectItem>
                                <SelectItem key="price-high">Price: High to Low</SelectItem>
                                <SelectItem key="rating">Highest Rated</SelectItem>
                                <SelectItem key="newest">Newest First</SelectItem>
                            </Select>
                        </div>
                    </div>

                    {/* Products Grid/List */}
                    {paginatedProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {paginatedProducts.map((product) => {
                                    return (
                                        <ModernProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-12">
                                    <Pagination
                                        total={totalPages}
                                        page={currentPage}
                                        onChange={setCurrentPage}
                                        showControls
                                        size="lg"
                                        color="primary"
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl text-default-300 mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                No products found
                            </h3>
                            <p className="text-default-600 mb-6">
                                We're working hard to add more {currentCategory.name.toLowerCase()} to our inventory.
                            </p>
                            <Button
                                as={Link}
                                to="/categories"
                                color="primary"
                                size="lg"
                            >
                                Browse Other Categories
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </ModernLayout>
    );
};

export default ModernCategoryPage;