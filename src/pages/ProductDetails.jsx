import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Breadcrumb from '../components/layout/Breadcrumb';
import ProductGallery from '../components/product/ProductGallery';
import Rating from '../components/common/Rating';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ProductGrid from '../components/product/ProductGrid';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency, getRelatedProducts } from '../utils/helpers';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            setRelatedProducts(getRelatedProducts(products, foundProduct, 4));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/products');
        }
    }, [id, navigate]);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        toast.success(`Added ${quantity} item(s) to cart!`);
    };

    const handleBuyNow = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        navigate('/cart');
    };

    const handleWishlistToggle = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const breadcrumbItems = [
        { label: 'Products', path: '/products' },
        { label: product.category, path: `/products?category=${product.category}` },
        { label: product.name },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                <Breadcrumb items={breadcrumbItems} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ProductGallery images={product.images} productName={product.name} />
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Brand */}
                        <p className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</p>

                        {/* Product Name */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center space-x-4">
                            <Rating rating={product.rating} reviews={product.reviews} />
                            {product.inStock ? (
                                <Badge variant="success">In Stock</Badge>
                            ) : (
                                <Badge variant="error">Out of Stock</Badge>
                            )}
                        </div>

                        {/* Price */}
                        <div className="bg-gray-100 p-6 rounded-xl">
                            <div className="flex items-baseline space-x-4 mb-2">
                                <span className="text-4xl font-bold text-gray-900">
                                    {formatCurrency(product.price)}
                                </span>
                                {product.originalPrice > product.price && (
                                    <>
                                        <span className="text-xl text-gray-500 line-through">
                                            {formatCurrency(product.originalPrice)}
                                        </span>
                                        <Badge variant="discount" className="text-lg">
                                            {product.discount}% OFF
                                        </Badge>
                                    </>
                                )}
                            </div>
                            {product.originalPrice > product.price && (
                                <p className="text-green-600 font-medium">
                                    You save {formatCurrency(product.originalPrice - product.price)}!
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Description</h3>
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Features */}
                        {product.features && (
                            <div>
                                <h3 className="font-semibold text-lg mb-3">Key Features</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start space-x-2">
                                            <span className="text-primary-600 mt-1">✓</span>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                variant="primary"
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                className="flex-1"
                                icon={<FaShoppingCart />}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleBuyNow}
                                disabled={!product.inStock}
                                className="flex-1"
                            >
                                Buy Now
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleWishlistToggle}
                                icon={inWishlist ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                            >
                                {inWishlist ? 'Saved' : 'Save'}
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-xl shadow-soft p-8 mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

                    <div className="space-y-6">
                        {[
                            { name: 'John Doe', rating: 5, comment: 'Excellent product! Highly recommended.', date: '2024-01-10' },
                            { name: 'Jane Smith', rating: 4, comment: 'Good quality, fast delivery.', date: '2024-01-08' },
                            { name: 'Mike Johnson', rating: 5, comment: 'Worth every penny!', date: '2024-01-05' },
                        ].map((review, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <p className="font-semibold text-gray-900">{review.name}</p>
                                        <div className="flex items-center space-x-1 mt-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                                                    size={16}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
                        <ProductGrid products={relatedProducts} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
