import { motion } from "framer-motion";

const Title = ({ children }) => {
    return (
        <motion.h1
            className="text-3xl w-1/2 text-center mx-auto"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
        >
            {children}
        </motion.h1>
    );
}

export default Title;