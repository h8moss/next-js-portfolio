import { AnimatePresence, motion } from "framer-motion";

const Card = ({ className, children, onExit, ...props }) => {
    return (
        <motion.div
            className={`bg-white shadow-lg
                        rounded-lg mx-auto text-gray-800
                        my-4 flex flex-col ` + className}

            initial={{
                overflow: 'clip',
                padding: '0px',
                height: '0',
                minHeight: '0',
            }}

            animate={{
                overflow: 'auto',
                padding: '20px',
                width: '70%',
                height: 'auto',
                minHeight: '100%',
            }}

            exit={{
                overflow: 'cli,',
                padding: '0px',
                width: '0px'
            }}

            {...props}
        >
            {children}
        </motion.div>
    );
}

export default Card;