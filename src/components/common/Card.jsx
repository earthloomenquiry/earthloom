import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, onClick, ...props }) => {
    return (
        <motion.div
            whileHover={hover ? { y: -5, boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15)' } : {}}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-xl shadow-soft overflow-hidden ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
