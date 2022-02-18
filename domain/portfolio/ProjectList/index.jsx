import { AnimatePresence, motion } from "framer-motion";

import ProjectListTile from "./ProjectListTile";

const ProjectList = ({ onClick, projects, isIndexVisible }) => {
    return (
        <motion.div
            className='bg-white flex-grow w-full flex flex-col 
            rounded-md shadow-2xl overflow-auto'

            initial={{
                x: '-100vw',
            }}
            exit={{
                x: '-100vw',
            }}
            animate={{
                x: '0'
            }}

        >
            {projects.map((project, i) => {

                let isVisible = isIndexVisible(i);

                return (
                    <AnimatePresence key={project.title}>
                        {isVisible &&
                            <ProjectListTile
                                project={project}
                                onClick={() => onClick(i)}
                            />
                        }
                    </AnimatePresence>
                );
            })}
        </motion.div>
    );
}

export default ProjectList;