import { motion } from 'framer-motion';
import { FaBox, FaShippingFast, FaCheckCircle } from 'react-icons/fa';
import Breadcrumb from '../components/layout/Breadcrumb';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import { mockOrders } from '../data/mockOrders';
import { formatCurrency, formatDate } from '../utils/helpers';

const OrderHistory = () => {
    const orders = mockOrders;

    const breadcrumbItems = [{ label: 'My Orders' }];

    const getStatusBadge = (status) => {
        const variants = {
            'Delivered': 'success',
            'In Transit': 'info',
            'Pending': 'warning',
            'Cancelled': 'error',
        };
        return <Badge variant={variants[status] || 'info'}>{status}</Badge>;
    };

    const getStatusIcon = (status) => {
        const icons = {
            'Delivered': <FaCheckCircle className="text-green-600" size={24} />,
            'In Transit': <FaShippingFast className="text-blue-600" size={24} />,
            'Pending': <FaBox className="text-yellow-600" size={24} />,
        };
        return icons[status] || <FaBox className="text-gray-600" size={24} />;
    };

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container-custom">
                    <Breadcrumb items={breadcrumbItems} />
                    <EmptyState
                        icon={<FaBox />}
                        title="No Orders Yet"
                        message="You haven't placed any orders yet. Start shopping to see your orders here!"
                        action={() => window.location.href = '/products'}
                        actionLabel="Start Shopping"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                <Breadcrumb items={breadcrumbItems} />

                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-soft overflow-hidden"
                        >
                            {/* Order Header */}
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex items-center space-x-4">
                                        {getStatusIcon(order.status)}
                                        <div>
                                            <p className="font-semibold text-gray-900">Order #{order.id}</p>
                                            <p className="text-sm text-gray-600">Placed on {formatDate(order.date)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        {getStatusBadge(order.status)}
                                        <p className="font-bold text-lg text-gray-900">
                                            {formatCurrency(order.total)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-6">
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold text-gray-900">
                                                {formatCurrency(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Details */}
                                <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                                        <p className="text-sm text-gray-700">{order.shippingAddress.name}</p>
                                        <p className="text-sm text-gray-700">{order.shippingAddress.address}</p>
                                        <p className="text-sm text-gray-700">
                                            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Payment Method</h4>
                                        <p className="text-sm text-gray-700">{order.paymentMethod}</p>
                                        {order.trackingNumber && (
                                            <>
                                                <h4 className="font-semibold text-gray-900 mt-4 mb-2">Tracking Number</h4>
                                                <p className="text-sm text-primary-600 font-mono">{order.trackingNumber}</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                    {order.status === 'In Transit' && (
                                        <button className="btn btn-primary">Track Order</button>
                                    )}
                                    {order.status === 'Delivered' && (
                                        <>
                                            <button className="btn btn-outline">Reorder</button>
                                            <button className="btn btn-outline">Write Review</button>
                                        </>
                                    )}
                                    <button className="btn btn-ghost">View Details</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
