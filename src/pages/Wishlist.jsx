import { motion } from 'framer-motion';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/layout/Breadcrumb';
import ProductGrid from '../components/product/ProductGrid';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const breadcrumbItems = [{ label: 'My Wishlist' }];

    const handleAddAllToCart = () => {
        wishlist.forEach(product => {
            addToCart(product);
        });
    };

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container-custom">
                    <Breadcrumb items={breadcrumbItems} />
                    <EmptyState
                        icon={<FaHeart />}
                        title="Your Wishlist is Empty"
                        message="Save your favorite items to your wishlist and shop them later!"
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

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
                        <p className="text-gray-600">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="primary"
                            onClick={handleAddAllToCart}
                            icon={<FaShoppingCart />}
                        >
                            Add All to Cart
                        </Button>
                        <Link to="/products">
                            <Button variant="outline">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ProductGrid products={wishlist} />
                </motion.div>
            </div>
        </div>
    );
};

export default Wishlist;
