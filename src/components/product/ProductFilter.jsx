import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { PRICE_RANGES, RATING_FILTERS } from '../../utils/constants';
import { categories } from '../../data/products';

const ProductFilter = ({ filters, onFilterChange }) => {
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        price: true,
        rating: true,
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleCategoryChange = (category) => {
        onFilterChange({ ...filters, category });
    };

    const handlePriceChange = (priceRange) => {
        onFilterChange({ ...filters, priceRange });
    };

    const handleRatingChange = (rating) => {
        onFilterChange({ ...filters, minRating: rating });
    };

    const clearFilters = () => {
        onFilterChange({
            category: 'All',
            priceRange: null,
            minRating: 0,
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                    Clear All
                </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <button
                    onClick={() => toggleSection('category')}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <h4 className="font-semibold text-gray-900">Category</h4>
                    {expandedSections.category ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {expandedSections.category && (
                    <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                checked={filters.category === 'All'}
                                onChange={() => handleCategoryChange('All')}
                                className="text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-sm text-gray-700">All Products</span>
                        </label>
                        {categories.map((cat) => (
                            <label key={cat.id} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={filters.category === cat.name}
                                    onChange={() => handleCategoryChange(cat.name)}
                                    className="text-primary-600 focus:ring-primary-500"
                                />
                                <span className="text-sm text-gray-700">
                                    {cat.name} ({cat.count})
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Filter */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <h4 className="font-semibold text-gray-900">Price Range</h4>
                    {expandedSections.price ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {expandedSections.price && (
                    <div className="space-y-2">
                        {PRICE_RANGES.map((range, index) => (
                            <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="price"
                                    checked={filters.priceRange?.min === range.min && filters.priceRange?.max === range.max}
                                    onChange={() => handlePriceChange(range)}
                                    className="text-primary-600 focus:ring-primary-500"
                                />
                                <span className="text-sm text-gray-700">{range.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Rating Filter */}
            <div>
                <button
                    onClick={() => toggleSection('rating')}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <h4 className="font-semibold text-gray-900">Customer Rating</h4>
                    {expandedSections.rating ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {expandedSections.rating && (
                    <div className="space-y-2">
                        {RATING_FILTERS.map((filter) => (
                            <label key={filter.value} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={filters.minRating === filter.value}
                                    onChange={() => handleRatingChange(filter.value)}
                                    className="text-primary-600 focus:ring-primary-500"
                                />
                                <span className="text-sm text-gray-700">{filter.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductFilter;
