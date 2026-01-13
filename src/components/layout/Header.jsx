import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaSearch,
    FaShoppingCart,
    FaHeart,
    FaUser,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { APP_NAME } from '../../utils/constants';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { getCartItemCount } = useCart();
    const { wishlist } = useWishlist();
    const { isAuthenticated, user, logout } = useAuth();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${searchQuery}`);
            setSearchQuery('');
        }
    };

    const cartCount = getCartItemCount();

    return (
        <header className="sticky top-0 z-30 bg-gradient-to-r from-white via-primary-50/30 to-white shadow-md backdrop-blur-sm">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                            <img
                                src="/earthloom-logo.jpg"
                                alt="Earthloom Logo"
                                className="w-full h-full object-contain drop-shadow-lg"
                            />
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-600 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-secondary-500 transition-all duration-300">
                                {APP_NAME}
                            </span>
                            <p className="text-xs text-gray-600 font-medium -mt-1">Sustainable Shopping</p>
                        </div>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search for products, brands and more..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary-600 hover:text-primary-700"
                            >
                                <FaSearch size={20} />
                            </button>
                        </div>
                    </form>

                    {/* Navigation Icons */}
                    <div className="flex items-center space-x-4 md:space-x-6">
                        {/* Wishlist */}
                        <Link
                            to="/wishlist"
                            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block"
                        >
                            <FaHeart size={22} className="text-gray-700" />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <FaShoppingCart size={22} className="text-gray-700" />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </Link>

                        {/* User Account */}
                        <div className="relative group hidden md:block">
                            <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <FaUser size={20} className="text-gray-700" />
                                <span className="text-sm font-medium text-gray-700">
                                    {isAuthenticated ? user?.name : 'Account'}
                                </span>
                            </button>

                            {/* Dropdown */}
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {isAuthenticated ? (
                                    <>
                                        <Link
                                            to="/orders"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                                        >
                                            My Orders
                                        </Link>
                                        <Link
                                            to="/wishlist"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Wishlist
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 md:hidden hover:bg-gray-100 rounded-full transition-colors"
                        >
                            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="md:hidden pb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-primary-600"
                        >
                            <FaSearch size={18} />
                        </button>
                    </div>
                </form>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden border-t border-gray-200 bg-white"
                >
                    <div className="container-custom py-4 space-y-2">
                        <Link
                            to="/wishlist"
                            className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <FaHeart className="text-gray-700" />
                            <span>Wishlist ({wishlist.length})</span>
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/orders"
                                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <FaUser className="text-gray-700" />
                                    <span>My Orders</span>
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg w-full text-left text-red-600"
                                >
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <FaUser className="text-gray-700" />
                                    <span>Login</span>
                                </Link>
                                <Link
                                    to="/signup"
                                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span>Sign Up</span>
                                </Link>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Header;
