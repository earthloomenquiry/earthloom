import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import Breadcrumb from '../components/layout/Breadcrumb';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyState from '../components/common/EmptyState';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart } = useCart();

    const breadcrumbItems = [{ label: 'Shopping Cart' }];

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container-custom">
                    <Breadcrumb items={breadcrumbItems} />
                    <EmptyState
                        icon={<FaShoppingBag />}
                        title="Your Cart is Empty"
                        message="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
                        action={() => window.location.href = '/products'}
                        actionLabel="Continue Shopping"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                <Breadcrumb items={breadcrumbItems} />

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                    <Link to="/products">
                        <button className="btn btn-ghost flex items-center space-x-2">
                            <FaArrowLeft />
                            <span>Continue Shopping</span>
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence>
                            {cart.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Cart Summary */}
                    <div className="lg:col-span-1">
                        <CartSummary />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
