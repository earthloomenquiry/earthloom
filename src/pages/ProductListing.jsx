import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import Breadcrumb from '../components/layout/Breadcrumb';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilter from '../components/product/ProductFilter';
import ProductSort from '../components/product/ProductSort';
import { fetchProducts, fetchCategories } from '../services/api';
import { filterByCategory, filterByPriceRange, filterByRating, sortProducts, searchProducts } from '../utils/helpers';

const ProductListing = () => {
    const [searchParams] = useSearchParams();
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        category: searchParams.get('category') || 'All',
        priceRange: null,
        minRating: 0,
    });

    const [sortBy, setSortBy] = useState('relevance');

    // Fetch products and categories on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    fetchProducts(),
                    fetchCategories()
                ]);
                setAllProducts(productsData);
                setFilteredProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Apply filters and sorting
    useEffect(() => {
        if (loading) return;

        let result = [...allProducts];

        // Apply search
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            result = searchProducts(result, searchQuery);
        }

        // Apply filters
        result = filterByCategory(result, filters.category);

        if (filters.priceRange) {
            result = filterByPriceRange(result, filters.priceRange.min, filters.priceRange.max);
        }

        if (filters.minRating > 0) {
            result = filterByRating(result, filters.minRating);
        }

        // Apply sorting
        result = sortProducts(result, sortBy);

        setFilteredProducts(result);
    }, [filters, sortBy, searchParams, allProducts, loading]);

    // Update category filter when URL param changes
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setFilters(prev => ({ ...prev, category: categoryParam }));
        }
    }, [searchParams]);

    const breadcrumbItems = [
        { label: 'Products', path: '/products' },
        ...(filters.category !== 'All' ? [{ label: filters.category }] : []),
    ];

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                <Breadcrumb items={breadcrumbItems} />

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {searchParams.get('search')
                            ? `Search Results for "${searchParams.get('search')}"`
                            : filters.category !== 'All'
                                ? filters.category
                                : 'All Products'}
                    </h1>

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden btn btn-outline flex items-center space-x-2"
                    >
                        <FaFilter />
                        <span>Filters</span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <ProductFilter filters={filters} onFilterChange={setFilters} categories={categories} />
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        <ProductSort
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                            resultCount={filteredProducts.length}
                        />

                        {filteredProducts.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <p className="text-2xl text-gray-600 mb-4">No products found</p>
                                <p className="text-gray-500">Try adjusting your filters or search query</p>
                                <button
                                    onClick={() => setFilters({ category: 'All', priceRange: null, minRating: 0 })}
                                    className="btn btn-primary mt-6"
                                >
                                    Clear Filters
                                </button>
                            </motion.div>
                        ) : (
                            <ProductGrid products={filteredProducts} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListing;
