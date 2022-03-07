import { motion } from "framer-motion";

import useTailwindSize from "../../../../hooks/useTailwindSize";
import ProjectDescription from "../../ProjectDescription";

const bgVariants = {
    'opacity-0': { backgroundColor: 'rgba(0,0,0,0)' },
    'opacity-1': { backgroundColor: 'rgba(0,0,0,0.2)' },
};

const MobileProjectView = ({ project, onExit }) => {

    const { isMd } = useTailwindSize();

    return (
        <>
            {!isMd &&
                <motion.div
                    className="bg-black bg-opacity-20 top-0 left-0 absolute w-screen h-screen flex z-[99]"
                    onClick={onExit}
                    variants={bgVariants}
                    initial='opacity-0'
                    animate='opacity-1'
                    exit='opacity-0'
                >
                    <div onClick={(e) => e.stopPropagation()} className='h-min w-full mx-4 my-auto'>
                        <motion.div
                            className="bg-white text-black rounded-xl p-1"
                            initial={{ y: '-100vh' }}
                            animate={{ y: '0vh' }}
                            exit={{ y: '100vh' }}
                        >
                            <ProjectDescription project={project} />
                        </motion.div>
                    </div>
                </motion.div>
            }
        </>
    )
}

export default MobileProjectView;