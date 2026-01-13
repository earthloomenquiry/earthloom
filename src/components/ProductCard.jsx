import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';
import { formatCurrency } from '../utils/helpers';

const ProductCard = ({ product }) => {
    const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useShop();
    const inWishlist = isInWishlist(product.id);

    const discountedPrice = product.price - (product.price * product.discount) / 100;

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
        }
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        }
        while (stars.length < 5) {
            stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-gray-300" />);
        }
        return stars;
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
    };

    return (
        <Link to={`/product/${product.id}`}>
            <motion.div
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group relative"
            >
                {/* Discount Badge */}
                {product.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                        {product.discount}% OFF
                    </div>
                )}

                {/* Wishlist Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleWishlistToggle}
                    className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-all ${inWishlist
                            ? 'bg-red-500 text-white'
                            : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                >
                    <FiHeart className={inWishlist ? 'fill-current' : ''} />
                </motion.button>

                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-square">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                    />
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        {product.category}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-3">
                        {renderStars(product.rating)}
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                            ({product.reviews})
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {formatCurrency(discountedPrice)}
                            </p>
                            {product.discount > 0 && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                    {formatCurrency(product.price)}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                    >
                        <FiShoppingCart />
                        <span>Add to Cart</span>
                    </motion.button>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;
