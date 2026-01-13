import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Breadcrumb from '../components/layout/Breadcrumb';
import AddressForm from '../components/checkout/AddressForm';
import PaymentOptions from '../components/checkout/PaymentOptions';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { formatCurrency, generateOrderId } from '../utils/helpers';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [addressData, setAddressData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState('');

    const total = getCartTotal();

    // Check if cart is empty and redirect
    useEffect(() => {
        if (cart.length === 0 && !orderPlaced) {
            navigate('/cart');
        }
    }, [cart.length, orderPlaced, navigate]);

    const handleAddressSubmit = (data) => {
        setAddressData(data);
        setStep(2);
    };

    const handlePlaceOrder = () => {
        // Simulate order placement
        const newOrderId = generateOrderId();
        setOrderId(newOrderId);
        setOrderPlaced(true);
        clearCart();
        toast.success('Order placed successfully!');

        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const breadcrumbItems = [
        { label: 'Cart', path: '/cart' },
        { label: 'Checkout' },
    ];

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-gray-50 py-16">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-12 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <FaCheckCircle className="text-green-600 text-5xl" />
                        </motion.div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Order Placed Successfully!
                        </h1>
                        <p className="text-gray-600 mb-2">
                            Thank you for your purchase. Your order has been confirmed.
                        </p>
                        <p className="text-lg font-semibold text-primary-600 mb-8">
                            Order ID: {orderId}
                        </p>

                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                            <div className="flex justify-between text-gray-700 mb-2">
                                <span>Total Amount:</span>
                                <span className="font-bold text-xl">{formatCurrency(total)}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Payment Method:</span>
                                <span className="capitalize">{paymentMethod.replace('-', ' ')}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="primary" onClick={() => navigate('/orders')}>
                                View Orders
                            </Button>
                            <Button variant="outline" onClick={() => navigate('/products')}>
                                Continue Shopping
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                <Breadcrumb items={breadcrumbItems} />

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-12">
                    <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'
                                }`}>
                                1
                            </div>
                            <span className="hidden sm:inline font-medium">Address</span>
                        </div>
                        <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                        <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'
                                }`}>
                                2
                            </div>
                            <span className="hidden sm:inline font-medium">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {step === 1 ? (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-xl shadow-soft p-8"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                                <AddressForm onSubmit={handleAddressSubmit} initialData={addressData} />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-xl shadow-soft p-8"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                                <PaymentOptions selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} />

                                <div className="flex gap-4 mt-8">
                                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                                        Back to Address
                                    </Button>
                                    <Button variant="primary" onClick={handlePlaceOrder} className="flex-1">
                                        Place Order
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                {cart.slice(0, 3).map((item) => (
                                    <div key={item.id} className="flex items-center space-x-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                                    </div>
                                ))}
                                {cart.length > 3 && (
                                    <p className="text-sm text-gray-600 text-center">
                                        +{cart.length - 3} more items
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>{formatCurrency(total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
