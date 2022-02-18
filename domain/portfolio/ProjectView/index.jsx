import { AnimatePresence, motion } from "framer-motion";

const ProjectView = ({ project }) => {
    return (
        <motion.div
            className='overflow-clip whitespace-nowrap h-full'
            initial={{ width: '0' }}
            animate={{ width: '50%' }}
            exit={{ width: '0' }}
        >
            <AnimatePresence
                exitBeforeEnter
            >
                <motion.div
                    className="flex flex-col h-full"
                    key={project.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <h2 className="text-3xl p-5">
                        {project.title}
                    </h2>
                    <div className="flex-grow border-4 p-5 m-2 rounded-xl border-purple-400">
                        <p>
                            {project.description}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

export default ProjectView;