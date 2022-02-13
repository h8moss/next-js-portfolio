import { AnimatePresence, motion } from "framer-motion";

const Label = ({ children, ...props }) => {
    return (
        <motion.label
            initial={{ color: '#0000' }}
            animate={{ color: '#fff', x: '0' }}
            exit={{ x: '-100vw' }}

            {...props}
        >
            {children}
        </motion.label>
    );
};

export default Label;