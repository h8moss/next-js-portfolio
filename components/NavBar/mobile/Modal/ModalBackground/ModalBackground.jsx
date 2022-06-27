import { motion } from "framer-motion";

const variants = {
    'visible': {
        'opacity': 1
    },
    'hidden': {
        'opacity': 0
    }
}

const ModalBackground = ({ children, onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            exit='hidden'
            initial='hidden'
            animate='visible'
            variants={variants}
            className='w-screen h-screen overflow-clip fixed left-0 top-0 bg-black bg-opacity-40 z-[99]'
        >
            {children}
        </motion.div>
    );
}

export default ModalBackground;