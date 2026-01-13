import { SORT_OPTIONS } from '../../utils/constants';

const ProductSort = ({ sortBy, onSortChange, resultCount }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <p className="text-gray-600">
                Showing <span className="font-semibold">{resultCount}</span> results
            </p>

            <div className="flex items-center space-x-3">
                <label htmlFor="sort" className="text-sm text-gray-700 font-medium">
                    Sort by:
                </label>
                <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                >
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ProductSort;
