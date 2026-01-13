import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/helpers';
import { FREE_SHIPPING_THRESHOLD } from '../../utils/constants';
import Button from '../common/Button';

const CartSummary = () => {
    const navigate = useNavigate();
    const { cart, getCartTotal, getCartSavings } = useCart();

    const subtotal = getCartTotal();
    const savings = getCartSavings();
    const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 50;
    const total = subtotal + shippingFee;

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cart.length} items)</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>

                {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span className="font-semibold">-{formatCurrency(savings)}</span>
                    </div>
                )}

                <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold">
                        {shippingFee === 0 ? (
                            <span className="text-green-600">FREE</span>
                        ) : (
                            formatCurrency(shippingFee)
                        )}
                    </span>
                </div>

                {subtotal < FREE_SHIPPING_THRESHOLD && (
                    <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                        Add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more to get FREE shipping!
                    </p>
                )}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                </div>
            </div>

            <Button
                variant="primary"
                fullWidth
                onClick={handleCheckout}
                disabled={cart.length === 0}
            >
                Proceed to Checkout
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
                Taxes calculated at checkout
            </p>
        </div>
    );
};

export default CartSummary;
