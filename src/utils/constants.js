// Application constants

export const APP_NAME = "Earthloom";
export const APP_TAGLINE = "Sustainable Shopping for a Better Tomorrow";

export const SORT_OPTIONS = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'discount', label: 'Discount' },
    { value: 'newest', label: 'Newest First' },
];

export const PRICE_RANGES = [
    { min: 0, max: 1000, label: 'Under ₹1,000' },
    { min: 1000, max: 5000, label: '₹1,000 - ₹5,000' },
    { min: 5000, max: 10000, label: '₹5,000 - ₹10,000' },
    { min: 10000, max: 25000, label: '₹10,000 - ₹25,000' },
    { min: 25000, max: 50000, label: '₹25,000 - ₹50,000' },
    { min: 50000, max: Infinity, label: 'Over ₹50,000' },
];

export const RATING_FILTERS = [
    { value: 4, label: '4★ & above' },
    { value: 3, label: '3★ & above' },
    { value: 2, label: '2★ & above' },
    { value: 1, label: '1★ & above' },
];

export const PAYMENT_METHODS = [
    {
        id: 'credit-card',
        name: 'Credit/Debit Card',
        icon: 'card',
        description: 'Visa, Mastercard, Rupay'
    },
    {
        id: 'upi',
        name: 'UPI',
        icon: 'upi',
        description: 'Google Pay, PhonePe, Paytm'
    },
    {
        id: 'netbanking',
        name: 'Net Banking',
        icon: 'bank',
        description: 'All major banks'
    },
    {
        id: 'cod',
        name: 'Cash on Delivery',
        icon: 'cash',
        description: 'Pay when you receive'
    },
];

export const ORDER_STATUS = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    SHIPPED: 'Shipped',
    IN_TRANSIT: 'In Transit',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
    RETURNED: 'Returned',
};

export const DELIVERY_TIME = '3-5 business days';

export const FREE_SHIPPING_THRESHOLD = 500;

export const CONTACT_INFO = {
    email: 'helpcenter@earthloom.com',
    phone: '+91 8102861783',
    address: 'Waghodia , Vadodara ( Gujarat )',
};

export const SOCIAL_LINKS = {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
};

export const FOOTER_LINKS = {
    about: [
        { label: 'About Us', path: '/about' },
        { label: 'Careers', path: '/careers' },
        { label: 'Press', path: '/press' },
        { label: 'Blog', path: '/blog' },
    ],
    help: [
        { label: 'Contact Us', path: '/contact' },
        { label: 'FAQs', path: '/faq' },
        { label: 'Shipping', path: '/shipping' },
        { label: 'Returns', path: '/returns' },
    ],
    policy: [
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Refund Policy', path: '/refund' },
        { label: 'Cookie Policy', path: '/cookies' },
    ],
};

export default {
    APP_NAME,
    APP_TAGLINE,
    SORT_OPTIONS,
    PRICE_RANGES,
    RATING_FILTERS,
    PAYMENT_METHODS,
    ORDER_STATUS,
    DELIVERY_TIME,
    FREE_SHIPPING_THRESHOLD,
    CONTACT_INFO,
    SOCIAL_LINKS,
    FOOTER_LINKS,
};
