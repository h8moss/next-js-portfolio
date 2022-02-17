import { AnimatePresence, motion } from "framer-motion";

const ProjectView = ({ project }) => {
    return (
        <motion.div
            className='overflow-clip whitespace-nowrap'
            initial={{ width: '0' }}
            animate={{ width: '50%' }}
            exit={{ width: '0' }}
        >
            <AnimatePresence
                exitBeforeEnter
            >
                <motion.div
                    key={project.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {project.title}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

export default ProjectView;