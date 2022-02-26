import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const TagButton = ({ tag, onClick, isSelected }) => {
    return (
        <div className='w-fit mx-1 my-2'>
            <motion.button
                layoutId={tag}
                onClick={onClick}
                whileHover={{
                    color: isSelected ? '#f00' : '#c8f',
                    backgroundColor: '#222',
                    scale: 1.1,
                }}
                initial={{
                    width: '0%',
                }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1, width: '100%', backgroundColor: '#555' }}
                className='rounded-lg p-2 text-sm flex-row flex whitespace-nowrap overflow-clip text-white'
            >
                {isSelected && <FiX className='my-auto' />}
                {tag}
            </motion.button>
        </div>
    );
}

export default TagButton;