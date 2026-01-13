import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const Breadcrumb = ({ items }) => {
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-primary-600 transition-colors">
                Home
            </Link>
            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <FaChevronRight size={12} className="text-gray-400" />
                    {item.path ? (
                        <Link to={item.path} className="hover:text-primary-600 transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 font-medium">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumb;
