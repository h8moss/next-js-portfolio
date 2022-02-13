import { motion } from 'framer-motion'

export default function StyledButton({ children, color, onClick, ...props }) {
    return (
        <motion.button
            initial={{ fontSize: '16px', color: '#fff' }}
            whileHover={{ fontSize: '22px', color: color }}
            exit={{ scaleX: '0px' }}
            onClick={onClick}
            {...props}
        >
            {children}
        </ motion.button>
    );
}