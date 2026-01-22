import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Rating from '../common/Rating';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/helpers';

import placeholderImg from '../../assets/images/placeholder.svg';

const ProductCard = ({ product, onQuickView }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleQuickView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onQuickView) {
            onQuickView(product);
        }
    };

    return (
        <Link to={`/product/${product.id}`}>
            <Card className="group relative overflow-hidden h-full flex flex-col">
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                    {/* Skeleton while loading */}
                    {!imageLoaded && !imageError && (
                        <div className="absolute inset-0 skeleton" />
                    )}
                    <img
                        src={imageError ? placeholderImg : product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-111 ${imageLoaded || imageError ? 'opacity-100' : 'opacity-0'
                            }`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => {
                            setImageError(true);
                            setImageLoaded(true);
                        }}
                        loading="lazy"
                    />

                    {/* Discount Badge */}
                    {product.discount > 0 && (
                        <Badge variant="discount" className="absolute top-3 left-3 font-bold">
                            {product.discount}% OFF
                        </Badge>
                    )}

                    {/* Wishlist Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleWishlistToggle}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                        {inWishlist ? (
                            <FaHeart className="text-red-500" size={18} />
                        ) : (
                            <FaRegHeart className="text-gray-600" size={18} />
                        )}
                    </motion.button>

                    {/* Quick View Button - Shows on Hover */}
                    {onQuickView && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2"
                            onClick={handleQuickView}
                        >
                            <FaEye />
                            <span className="text-sm font-medium">Quick View</span>
                        </motion.button>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex-1 flex flex-col">
                    {/* Brand */}
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        {product.brand}
                    </p>

                    {/* Product Name */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="mb-3">
                        <Rating rating={product.rating} reviews={product.reviews} size="sm" />
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-4 mt-auto">
                        <span className="text-2xl font-bold text-gray-900">
                            {formatCurrency(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                                {formatCurrency(product.originalPrice)}
                            </span>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        className="w-full btn btn-primary flex items-center justify-center space-x-2"
                    >
                        <FaShoppingCart />
                        <span>Add to Cart</span>
                    </motion.button>
                </div>
            </Card>
        </Link>
    );
};

export default ProductCard;
