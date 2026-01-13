import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import productsData from '../data/products.json';
import { getUniqueCategories, filterByCategory, sortProducts, searchProducts } from '../utils/helpers';

const Products = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('default');
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [minRating, setMinRating] = useState(0);

    const categories = getUniqueCategories(productsData);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setProducts(productsData);
            setLoading(false);
        }, 800);

        // Handle search query from URL
        const searchQuery = searchParams.get('search');
        const categoryQuery = searchParams.get('category');

        if (categoryQuery) {
            setSelectedCategory(categoryQuery);
        }
    }, [searchParams]);

    useEffect(() => {
        let result = [...products];

        // Apply search
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            result = searchProducts(result, searchQuery);
        }

        // Apply category filter
        result = filterByCategory(result, selectedCategory);

        // Apply price filter
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Apply rating filter
        result = result.filter(p => p.rating >= minRating);

        // Apply sorting
        result = sortProducts(result, sortBy);

        setFilteredProducts(result);
    }, [products, selectedCategory, sortBy, priceRange, minRating, searchParams]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    All Products
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="lg:w-64 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                            {/* Category Filter */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Category
                                </h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${selectedCategory === category
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Price Range
                                </h3>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="50000"
                                        step="1000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full"
                                    />
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Up to ₹{priceRange[1].toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Minimum Rating
                                </h3>
                                <div className="space-y-2">
                                    {[4, 3, 2, 1, 0].map((rating) => (
                                        <button
                                            key={rating}
                                            onClick={() => setMinRating(rating)}
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${minRating === rating
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                }`}
                                        >
                                            {rating > 0 ? `${rating}+ Stars` : 'All Ratings'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <main className="flex-1">
                        {/* Sort and Results Count */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-600 dark:text-gray-400">
                                {filteredProducts.length} products found
                            </p>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="default">Sort by: Default</option>
                                <option value="price-low-high">Price: Low to High</option>
                                <option value="price-high-low">Price: High to Low</option>
                                <option value="rating">Rating: High to Low</option>
                                <option value="discount">Discount: High to Low</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loading
                                ? [...Array(9)].map((_, i) => <SkeletonLoader key={i} />)
                                : filteredProducts.length > 0
                                    ? filteredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))
                                    : (
                                        <div className="col-span-full text-center py-16">
                                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                                No products found
                                            </p>
                                        </div>
                                    )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Products;
