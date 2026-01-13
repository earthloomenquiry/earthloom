const EmptyState = ({
    title,
    message,
    icon,
    action,
    actionLabel = 'Go Back',
    className = ''
}) => {
    return (
        <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
            {icon && (
                <div className="text-6xl text-gray-300 mb-4">
                    {icon}
                </div>
            )}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-center max-w-md mb-6">{message}</p>
            {action && (
                <button
                    onClick={action}
                    className="btn btn-primary"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
