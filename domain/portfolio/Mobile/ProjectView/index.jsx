import { AnimatePresence, motion } from "framer-motion";

import ProjectDescription from "../../ProjectDescription";


const MobileProjectView = ({ project, onExit }) => {

    let showProject = project !== null;

    return (
        <AnimatePresence>
            {showProject &&
                <div
                    className="bg-black bg-opacity-10 top-0 left-0 static w-screen h-screen flex"
                    onClick={onExit}
                >
                    <div onClick={(e) => e.stopPropagation()} className='h-full w-full m-8'>
                        <motion.div
                            className="h-full bg-white text-black rounded-sm"
                            initial={{ y: '-100vh' }}
                            animate={{ y: '0vh' }}
                            exit={{ y: '100vh' }}
                        >
                            <ProjectDescription project={project} />
                        </motion.div>
                    </div>
                </div>
            }
        </AnimatePresence>
    )
}

export default MobileProjectView;