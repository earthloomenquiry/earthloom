const Skeleton = ({ type = 'text', className = '', count = 1 }) => {
    const types = {
        text: 'h-4 w-full rounded',
        title: 'h-8 w-3/4 rounded',
        image: 'h-64 w-full rounded-lg',
        card: 'h-96 w-full rounded-xl',
        circle: 'h-12 w-12 rounded-full',
        button: 'h-12 w-32 rounded-lg',
    };

    const skeletons = Array.from({ length: count }, (_, i) => (
        <div key={i} className={`skeleton ${types[type]} ${className}`} />
    ));

    return <>{skeletons}</>;
};

export const ProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-xl shadow-soft p-4">
            <Skeleton type="image" className="mb-4" />
            <Skeleton type="title" className="mb-2" />
            <Skeleton type="text" className="mb-2" />
            <Skeleton type="text" className="w-1/2 mb-4" />
            <Skeleton type="button" className="w-full" />
        </div>
    );
};

export default Skeleton;
