import { motion } from 'framer-motion'

export default function StyledButton({ children, color, onClick }) {
    return (
        <motion.button
            initial={{ fontSize: '16px', color: '#fff' }}
            whileHover={{ fontSize: '22px', color: color }}
            onClick={onClick}
        >
            {children}
        </ motion.button>
    );
}