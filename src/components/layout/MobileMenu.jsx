import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaHome, FaShoppingBag, FaHeart, FaHistory, FaUser, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const MobileMenu = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();

    const menuItems = [
        { icon: <FaHome />, label: 'Home', path: '/' },
        { icon: <FaShoppingBag />, label: 'Products', path: '/products' },
        { icon: <FaHeart />, label: 'Wishlist', path: '/wishlist' },
        { icon: <FaHistory />, label: 'Orders', path: '/orders' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />

                    {/* Menu */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* User Section */}
                        <div className="p-6 border-b border-gray-200">
                            {user ? (
                                <div>
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                            <FaUser className="text-primary-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-600">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            logout();
                                            onClose();
                                        }}
                                        className="w-full btn btn-outline text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" onClick={onClose}>
                                    <button className="w-full btn btn-primary flex items-center justify-center space-x-2">
                                        <FaSignInAlt />
                                        <span>Sign In</span>
                                    </button>
                                </Link>
                            )}
                        </div>

                        {/* Navigation */}
                        <nav className="p-4">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.path}
                                    onClick={onClose}
                                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <span className="text-gray-600 text-xl">{item.icon}</span>
                                    <span className="font-medium text-gray-900">{item.label}</span>
                                </Link>
                            ))}
                        </nav>

                        {/* Footer */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
                            <p className="text-sm text-gray-600 text-center">
                                © 2024 ShopHub. All rights reserved.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
