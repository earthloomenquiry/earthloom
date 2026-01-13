import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../common/Skeleton';

const ProductGrid = ({ products, loading = false, onQuickView }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-xl text-gray-600">No products found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
            ))}
        </div>
    );
};

export default ProductGrid;
