import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaShippingFast, FaUndo, FaLock, FaHeadset } from 'react-icons/fa';
import ProductGrid from '../components/product/ProductGrid';
import { products, categories } from '../data/products';
import { getRandomProducts } from '../utils/helpers';
import { APP_NAME, APP_TAGLINE } from '../utils/constants';

const Home = () => {
    const featuredProducts = getRandomProducts(products, 8);
    const dealsProducts = products.filter(p => p.discount >= 35).slice(0, 4);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCA0MGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                <div className="container-custom relative z-10 py-20 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                            Welcome to {APP_NAME}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-white/90 font-medium">
                            {APP_TAGLINE}
                        </p>
                        <p className="text-lg mb-8 text-white/80">
                            Discover eco-friendly products that care for you and our planet. Shop sustainably, live responsibly.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/products">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white text-primary-700 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center space-x-2"
                                >
                                    <span>Shop Now</span>
                                    <FaArrowRight />
                                </motion.button>
                            </Link>
                            <Link to="/products?category=Electronics">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/20 transition-colors"
                                >
                                    Browse Electronics
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"></div>
            </section>

            {/* Features Section */}
            <section className="py-12 bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <FaShippingFast size={32} />, title: 'Free Shipping', desc: 'On orders above ₹500' },
                            { icon: <FaUndo size={32} />, title: 'Easy Returns', desc: '30-day return policy' },
                            { icon: <FaLock size={32} />, title: 'Secure Payment', desc: '100% secure transactions' },
                            { icon: <FaHeadset size={32} />, title: '24/7 Support', desc: 'Dedicated customer support' },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-soft"
                            >
                                <div className="text-primary-600 mb-4">{feature.icon}</div>
                                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Explore our wide range of product categories
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {categories.map((category, index) => (
                            <Link key={category.id} to={`/products?category=${category.name}`}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="group relative overflow-hidden rounded-xl shadow-soft hover:shadow-hover transition-all duration-300"
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                        <div className="text-white">
                                            <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                                            <p className="text-sm text-white/80">{category.count} products</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between mb-12"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                Featured Products
                            </h2>
                            <p className="text-gray-600">Handpicked items just for you</p>
                        </div>
                        <Link to="/products">
                            <button className="btn btn-outline hidden md:flex items-center space-x-2">
                                <span>View All</span>
                                <FaArrowRight />
                            </button>
                        </Link>
                    </motion.div>

                    <ProductGrid products={featuredProducts} />

                    <div className="text-center mt-8 md:hidden">
                        <Link to="/products">
                            <button className="btn btn-outline">
                                View All Products
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Deals Section */}
            <section className="py-16">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            🔥 Hot Deals
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Limited time offers - Up to 50% off!
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dealsProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={`/product/${product.id}`}>
                                    <div className="group relative bg-white rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 overflow-hidden">
                                        <div className="absolute top-3 left-3 z-10">
                                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                                {product.discount}% OFF
                                            </span>
                                        </div>
                                        <div className="aspect-square overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xl font-bold text-gray-900">
                                                    ₹{product.price.toLocaleString()}
                                                </span>
                                                <span className="text-sm text-gray-500 line-through">
                                                    ₹{product.originalPrice.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCA0MGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Subscribe to Our Newsletter
                        </h2>
                        <p className="text-white/90 mb-8">
                            Get the latest updates on new sustainable products and exclusive eco-friendly offers!
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-white text-primary-700 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                Subscribe
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
