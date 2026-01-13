import { motion } from 'framer-motion';
import { FiPackage, FiClock, FiCheckCircle } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { formatCurrency } from '../utils/helpers';
import { Link } from 'react-router-dom';

const Orders = () => {
    const { orders, user } = useShop();

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <FiPackage className="mx-auto text-gray-400 mb-4" size={80} />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Please login to view orders
                    </h2>
                    <Link to="/auth">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold mt-4"
                        >
                            Login
                        </motion.button>
                    </Link>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <FiPackage className="mx-auto text-gray-400 mb-4" size={80} />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        No orders yet
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Start shopping to see your orders here!
                    </p>
                    <Link to="/products">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold"
                        >
                            Start Shopping
                        </motion.button>
                    </Link>
                </div>
            </div>
        );
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered':
                return <FiCheckCircle className="text-green-500" size={24} />;
            case 'Pending':
                return <FiClock className="text-yellow-500" size={24} />;
            default:
                return <FiPackage className="text-blue-500" size={24} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            default:
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    My Orders ({orders.length})
                </h1>

                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                        >
                            {/* Order Header */}
                            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Order ID: <span className="font-semibold text-gray-900 dark:text-white">#{order.id}</span>
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Placed on: {new Date(order.date).toLocaleDateString('en-IN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(order.status)}
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-6">
                                <div className="space-y-4 mb-4">
                                    {order.items.map((item) => {
                                        const discountedPrice = item.price - (item.price * item.discount) / 100;
                                        return (
                                            <div key={item.id} className="flex items-center space-x-4">
                                                <img
                                                    src={item.images[0]}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Quantity: {item.quantity}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-900 dark:text-white">
                                                        {formatCurrency(discountedPrice * item.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Order Total */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Total Amount
                                    </span>
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(order.total)}
                                    </span>
                                </div>

                                {/* Shipping Address */}
                                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        Shipping Address
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {order.fullName}<br />
                                        {order.address}<br />
                                        {order.city}, {order.state} - {order.pincode}<br />
                                        Phone: {order.phone}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
