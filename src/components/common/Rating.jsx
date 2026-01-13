import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ rating, reviews, showReviews = true, size = 'md' }) => {
    const sizes = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    };

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
        }

        return stars;
    };

    return (
        <div className={`flex items-center gap-1 ${sizes[size]}`}>
            <div className="flex items-center gap-0.5">
                {renderStars()}
            </div>
            {showReviews && reviews && (
                <span className="text-gray-600 ml-1">
                    ({reviews.toLocaleString()})
                </span>
            )}
        </div>
    );
};

export default Rating;
