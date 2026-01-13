import { motion } from 'framer-motion';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/helpers';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(item.id);
        } else {
            updateQuantity(item.id, newQuantity);
        }
    };

    const itemTotal = item.price * item.quantity;
    const savings = (item.originalPrice - item.price) * item.quantity;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl shadow-soft"
        >
            {/* Product Image */}
            <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.brand}</p>

                    <div className="flex items-center space-x-3 mb-2">
                        <span className="text-xl font-bold text-gray-900">
                            {formatCurrency(item.price)}
                        </span>
                        {item.originalPrice > item.price && (
                            <>
                                <span className="text-sm text-gray-500 line-through">
                                    {formatCurrency(item.originalPrice)}
                                </span>
                                <span className="text-sm text-green-600 font-medium">
                                    {item.discount}% off
                                </span>
                            </>
                        )}
                    </div>

                    {savings > 0 && (
                        <p className="text-sm text-green-600">
                            You save {formatCurrency(savings)}!
                        </p>
                    )}
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => handleQuantityChange(item.quantity - 1)}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <FaMinus size={12} />
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(item.quantity + 1)}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <FaPlus size={12} />
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="font-bold text-lg text-gray-900">
                            {formatCurrency(itemTotal)}
                        </span>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CartItem;
