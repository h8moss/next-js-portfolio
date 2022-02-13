import { motion } from "framer-motion";

const FieldMotion = ({ children, className, ...props }) => {
    return (
        <motion.div
            className={'overflow-clip ' + className}
            initial={{ width: '0px' }}
            animate={{ width: '100%' }}
            exit={{ width: '0px' }}
            transition={{
                stiffness: 30,
                damping: 10,
                duration: 0.7,
                type: 'spring'
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export default FieldMotion;