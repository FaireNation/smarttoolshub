import React, { useState } from 'react';
import {
    Card, Input, Button, Slider, CheckboxGroup, Checkbox, Divider,
    Select, SelectItem, Chip, Pagination, Breadcrumbs, BreadcrumbItem,
    useDisclosure
} from "@heroui/react";
import { Search, Grid, List, SlidersHorizontal } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import ProductCard from '../../components/ProductCard';
import QuickViewModal from '../../components/QuickViewModal';
import { Product } from '../../types';
import { products, getAllCategories, getAllBrands, getSaleProducts, getInStockProducts } from '../../data/products';

// Updated Product interface
const ProductsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);
    const [sortBy, setSortBy] = useState('popularity');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const categories = getAllCategories();
    const brands = getAllBrands();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
        }).format(price / 100);
    };

    // Clear all filters function
    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPriceRange([0, 500000]);
        setCurrentPage(1);
    };

    // Get total active filters count
    const activeFiltersCount = selectedCategories.length + selectedBrands.length +
        (searchTerm.length > 0 ? 1 : 0) +
        (priceRange[0] > 0 || priceRange[1] < 500000 ? 1 : 0);

    const filteredProducts = products.filter((product: Product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesBrand = selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand));
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

        return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    // Sort the filtered products based on selected criteria
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'name':
                return a.name.localeCompare(b.name);
            case 'popularity':
            default:
                // Sort by combination of rating and review count
                const aPopularity = (a.rating * a.reviewCount) + (a.isPopular ? 1000 : 0) + (a.isFeatured ? 500 : 0);
                const bPopularity = (b.rating * b.reviewCount) + (b.isPopular ? 1000 : 0) + (b.isFeatured ? 500 : 0);
                return bPopularity - aPopularity;
        }
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

    // Reset to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategories, selectedBrands, priceRange, sortBy]);

    return (
        <Layout>
            {/* Hero Section with Breadcrumbs */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Breadcrumbs className="mb-3 pt-4 pb-3">
                        <BreadcrumbItem href="/">Home</BreadcrumbItem>
                        <BreadcrumbItem>Products</BreadcrumbItem>
                    </Breadcrumbs>
                    <div className="flex flex-col mb-10 lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                                Quality Tools & Equipment
                            </h1>
                            <p className="text-base text-default-600 max-w-2xl">
                                Discover our comprehensive collection of professional-grade tools and equipment
                                from trusted brands. Find everything you need for your projects.
                            </p>
                            <div className="flex items-center gap-4 text-sm text-default-500 mt-2">
                                <span>Showing {paginatedProducts.length} of {sortedProducts.length} products</span>
                                {activeFiltersCount > 0 && (
                                    <Chip size="sm" color="primary" variant="flat">
                                        {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                                    </Chip>
                                )}
                            </div>
                        </div>

                        {/* Enhanced Search Bar */}
                        <div className="flex flex-col sm:flex-row gap-3 lg:min-w-[400px]">
                            <Input
                                classNames={{
                                    base: "flex-1",
                                    mainWrapper: "w-full",
                                    input: "text-small",
                                    inputWrapper: "bg-white dark:bg-default-100 border border-default-200 hover:border-primary/50 focus-within:border-primary shadow-sm",
                                }}
                                placeholder="Search tools, brands, categories..."
                                value={searchTerm}
                                onValueChange={setSearchTerm}
                                startContent={<Search className="text-default-400 pointer-events-none" size={20} />}
                                size="lg"
                                variant="flat"
                                radius="lg"
                            />
                            <div className="flex gap-2">
                                <Button
                                    isIconOnly
                                    variant={viewMode === 'grid' ? 'solid' : 'bordered'}
                                    color="primary"
                                    size="lg"
                                    onClick={() => setViewMode('grid')}
                                >
                                    <Grid size={20} />
                                </Button>
                                <Button
                                    isIconOnly
                                    variant={viewMode === 'list' ? 'solid' : 'bordered'}
                                    color="primary"
                                    size="lg"
                                    onClick={() => setViewMode('list')}
                                >
                                    <List size={20} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Enhanced Sidebar Filters */}
                    <aside className="lg:w-80 space-y-6">
                        <Card className="p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal size={20} className="text-primary" />
                                    <h3 className="text-lg font-semibold">Filters</h3>
                                </div>
                                {activeFiltersCount > 0 && (
                                    <Button
                                        size="sm"
                                        variant="light"
                                        color="danger"
                                        onClick={clearAllFilters}
                                    >
                                        Clear all
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-8">
                                {/* Price Range Filter */}
                                <div>
                                    <h4 className="font-semibold mb-4 text-foreground">Price Range</h4>
                                    <Slider
                                        label="Price Range"
                                        step={10000}
                                        minValue={0}
                                        maxValue={500000}
                                        value={priceRange}
                                        onChange={setPriceRange as any}
                                        formatOptions={{ style: 'currency', currency: 'NGN' }}
                                        className="max-w-md"
                                        color="primary"
                                        size="md"
                                    />
                                    <div className="flex justify-between mt-2 text-sm text-default-500">
                                        <span>{formatPrice(priceRange[0])}</span>
                                        <span>{formatPrice(priceRange[1])}</span>
                                    </div>
                                </div>

                                <Divider />

                                {/* Categories Filter */}
                                <div>
                                    <h4 className="font-semibold mb-4 text-foreground">Categories</h4>
                                    <CheckboxGroup
                                        value={selectedCategories}
                                        onValueChange={setSelectedCategories}
                                        color="primary"
                                    >
                                        {categories.map((category) => (
                                            <Checkbox key={category} value={category} size="md">
                                                <span className="text-default-700">{category}</span>
                                            </Checkbox>
                                        ))}
                                    </CheckboxGroup>
                                </div>

                                <Divider />

                                {/* Brands Filter */}
                                <div>
                                    <h4 className="font-semibold mb-4 text-foreground">Brands</h4>
                                    <CheckboxGroup
                                        value={selectedBrands}
                                        onValueChange={setSelectedBrands}
                                        color="primary"
                                    >
                                        {brands.map((brand) => (
                                            <Checkbox key={brand} value={brand} size="md">
                                                <span className="text-default-700">{brand}</span>
                                            </Checkbox>
                                        ))}
                                    </CheckboxGroup>
                                </div>
                            </div>
                        </Card>
                    </aside>

                    {/* Enhanced Main Content */}
                    <main className="flex-1 space-y-6">
                        {/* Enhanced Sort Controls & Quick Filters */}
                        <Card className="p-4 shadow-sm">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                {/* Quick Filter Chips */}
                                <div className="flex flex-wrap gap-2">
                                    <Chip
                                        variant="flat"
                                        color="default"
                                        className="font-medium"
                                    >
                                        All Products ({sortedProducts.length})
                                    </Chip>
                                    <Chip
                                        variant="flat"
                                        color="success"
                                        className="cursor-pointer hover:scale-105 transition-transform"
                                        onClick={() => setSelectedCategories([])}
                                    >
                                        In Stock ({getInStockProducts().length})
                                    </Chip>
                                    <Chip
                                        variant="flat"
                                        color="warning"
                                        className="cursor-pointer hover:scale-105 transition-transform"
                                        onClick={() => setSelectedCategories([])}
                                    >
                                        On Sale ({getSaleProducts().length})
                                    </Chip>
                                </div>

                                {/* Sort Dropdown */}
                                <Select
                                    placeholder="Sort by"
                                    selectedKeys={[sortBy]}
                                    onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
                                    className="w-56"
                                    size="md"
                                    variant="bordered"
                                >
                                    <SelectItem key="popularity">Popularity</SelectItem>
                                    <SelectItem key="price-low">Price: Low to High</SelectItem>
                                    <SelectItem key="price-high">Price: High to Low</SelectItem>
                                    <SelectItem key="rating">Highest Rated</SelectItem>
                                    <SelectItem key="newest">Newest First</SelectItem>
                                    <SelectItem key="name">Name A-Z</SelectItem>
                                </Select>
                            </div>
                        </Card>

                        {/* Products Grid/List */}
                        {paginatedProducts.length > 0 ? (
                            <>
                                <div className={`grid gap-6 ${viewMode === 'grid'
                                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                    : 'grid-cols-1'
                                    }`}>
                                    {paginatedProducts.map((product: Product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onQuickView={(product) => {
                                                setSelectedProduct(product);
                                                onOpen();
                                            }}
                                            onAddToWishlist={(product) => {
                                                console.log('Added to wishlist:', product.name);
                                            }}
                                            onAddToCart={(product) => {
                                                console.log('Added to cart:', product.name);
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Enhanced Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-default-200">
                                        <div className="text-sm text-default-600">
                                            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedProducts.length)} of {sortedProducts.length} products
                                        </div>
                                        <Pagination
                                            total={totalPages}
                                            page={currentPage}
                                            onChange={setCurrentPage}
                                            color="primary"
                                            showControls
                                            size="lg"
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            /* Enhanced Empty State */
                            (<Card className="text-center py-16 shadow-sm">
                                <div className="space-y-4">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-2xl font-semibold text-foreground">No products found</h3>
                                    <p className="text-default-600 max-w-md mx-auto">
                                        We couldn't find any products matching your criteria.
                                        Try adjusting your filters or search terms.
                                    </p>
                                    <Button
                                        color="primary"
                                        variant="flat"
                                        onClick={clearAllFilters}
                                        size="lg"
                                        className="mt-4"
                                    >
                                        Clear All Filters
                                    </Button>
                                </div>
                            </Card>)
                        )}
                    </main>
                </div>
            </div>
            {/* Quick View Modal */}
            <QuickViewModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                product={selectedProduct}
                onAddToCart={(product, quantity) => {
                    console.log('Added to cart:', product.name, 'Quantity:', quantity);
                }}
                onAddToWishlist={(product) => {
                    console.log('Added to wishlist:', product.name);
                }}
            />
        </Layout>
    );
};

export default ProductsPage;