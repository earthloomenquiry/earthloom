import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes, FaExpand } from 'react-icons/fa';

const ProductGallery = ({ images, productName }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <>
            <div className="space-y-4">
                {/* Main Image */}
                <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square group">
                    <motion.img
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        src={images[selectedImage]}
                        alt={`${productName} - Image ${selectedImage + 1}`}
                        className="w-full h-full object-cover"
                    />

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                            >
                                <FaChevronLeft />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                            >
                                <FaChevronRight />
                            </button>
                        </>
                    )}

                    {/* Fullscreen Button */}
                    <button
                        onClick={() => setIsFullscreen(true)}
                        className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                    >
                        <FaExpand />
                    </button>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative bg-gray-100 rounded-lg overflow-hidden aspect-square border-2 transition-all ${selectedImage === index
                                        ? 'border-primary-600 ring-2 ring-primary-200'
                                        : 'border-transparent hover:border-gray-300'
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {isFullscreen && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
                        <button
                            onClick={() => setIsFullscreen(false)}
                            className="absolute top-4 right-4 p-3 bg-white rounded-full hover:bg-gray-100 transition-colors z-10"
                        >
                            <FaTimes size={24} />
                        </button>

                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={images[selectedImage]}
                            alt={productName}
                            className="max-w-full max-h-full object-contain"
                        />

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <FaChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <FaChevronRight size={24} />
                                </button>
                            </>
                        )}
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProductGallery;
