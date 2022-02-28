import { motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";

import useTailwindSize from "../../../../../hooks/useTailwindSize";

const variants = {
    'visible': { width: 'fit-content', margin: '0.5rem', padding: '0.5rem' },
    'invisible': { width: '0px', margin: '0rem', padding: '0rem' }
}

const FilterButton = ({ onClick, ...props }) => {

    const { isMd } = useTailwindSize();

    return (
        <motion.button
            className="bg-gray-600 text-white h-min rounded-md overflow-clip flex flex-row"
            onClick={onClick}
            variants={variants}
            initial='invisible'
            animate={isMd ? 'invisible' : 'visible'}
            exit='invisible'
            {...props}
        >
            <FiFilter className="my-auto mx-2" />
            Filter
        </motion.button>

    )
}

export default FilterButton;