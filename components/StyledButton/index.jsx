import { motion } from 'framer-motion'



const StyledButton = ({ children, color, onClick, initialSize = 16, ...props }) => {

    initialSize = Math.round(initialSize);
    const hoverSize = Math.round(initialSize * 1.38);

    return (
        <motion.button
            initial={{ fontSize: `${initialSize}px`, color: '#fff' }}
            whileHover={{ fontSize: `${hoverSize}px`, color: color }}
            exit={{ scaleX: '0px' }}
            onClick={onClick}
            {...props}
        >
            {children}
        </ motion.button>
    );
}

export default StyledButton;