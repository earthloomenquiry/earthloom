import { motion } from 'framer-motion';

const SkeletonLoader = ({ type = 'card' }) => {
    if (type === 'card') {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                <div className="animate-pulse">
                    {/* Image Skeleton */}
                    <div className="bg-gray-300 dark:bg-gray-700 aspect-square"></div>

                    {/* Content Skeleton */}
                    <div className="p-4 space-y-3">
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                        <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                            ))}
                        </div>
                        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'list') {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md p-4">
                <div className="animate-pulse flex space-x-4">
                    <div className="bg-gray-300 dark:bg-gray-700 h-24 w-24 rounded"></div>
                    <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default SkeletonLoader;
