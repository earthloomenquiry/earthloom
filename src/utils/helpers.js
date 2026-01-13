// Utility helper functions

// Format currency in Indian Rupees
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Calculate savings amount
export const calculateSavings = (originalPrice, currentPrice) => {
    return originalPrice - currentPrice;
};

// Format date
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
};

// Truncate text
export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Generate star rating array
export const generateStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push('full');
    }

    if (hasHalfStar) {
        stars.push('half');
    }

    while (stars.length < 5) {
        stars.push('empty');
    }

    return stars;
};

// Debounce function for search
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

// Filter products by category
export const filterByCategory = (products, category) => {
    if (!category || category === 'All') return products;
    return products.filter(product => product.category === category);
};

// Filter products by price range
export const filterByPriceRange = (products, minPrice, maxPrice) => {
    return products.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
    );
};

// Filter products by rating
export const filterByRating = (products, minRating) => {
    return products.filter(product => product.rating >= minRating);
};

// Sort products
export const sortProducts = (products, sortBy) => {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-low-high':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high-low':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'discount':
            return sorted.sort((a, b) => b.discount - a.discount);
        case 'newest':
            return sorted.sort((a, b) => b.id - a.id);
        default:
            return sorted;
    }
};

// Search products
export const searchProducts = (products, query) => {
    if (!query) return products;

    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.brand.toLowerCase().includes(lowerQuery)
    );
};

// Get unique categories from products
export const getUniqueCategories = (products) => {
    const categories = products.map(product => product.category);
    return ['All', ...new Set(categories)];
};

// Calculate cart total
export const calculateCartTotal = (cartItems) => {
    return cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
};

// Calculate cart item count
export const calculateCartItemCount = (cartItems) => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
};

// Generate order ID
export const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
};

// Validate email
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Validate phone number (Indian format)
export const validatePhone = (phone) => {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
};

// Validate pincode (Indian format)
export const validatePincode = (pincode) => {
    const re = /^[1-9][0-9]{5}$/;
    return re.test(pincode);
};

// Get random products
export const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Get related products (same category, excluding current product)
export const getRelatedProducts = (products, currentProduct, count = 4) => {
    const related = products.filter(
        product => product.category === currentProduct.category && product.id !== currentProduct.id
    );
    return related.slice(0, count);
};

export default {
    formatCurrency,
    calculateDiscount,
    calculateSavings,
    formatDate,
    truncateText,
    generateStarRating,
    debounce,
    filterByCategory,
    filterByPriceRange,
    filterByRating,
    sortProducts,
    searchProducts,
    getUniqueCategories,
    calculateCartTotal,
    calculateCartItemCount,
    generateOrderId,
    validateEmail,
    validatePhone,
    validatePincode,
    getRandomProducts,
    getRelatedProducts,
};
