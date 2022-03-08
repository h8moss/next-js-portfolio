import { AnimatePresence, motion } from "framer-motion";
import Image from 'next/image';

import useLocale from "../../../hooks/useLocale";
import useTailwindSize from "../../../hooks/useTailwindSize";
import ProjectDescription from "../ProjectDescription";

const ProjectView = ({ project }) => {

    const { isMd } = useTailwindSize();

    const width = isMd ? '50%' : '0%';

    return (
        <motion.div
            className='overflow-clip whitespace-nowrap h-full'
            initial={{ width: '0' }}
            animate={{ width: width }}
            exit={{ width: '0' }}
        >
            <AnimatePresence
                exitBeforeEnter
            >
                <motion.div
                    className="flex flex-col h-full"
                    key={project.title.en}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <ProjectDescription project={project} />
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

export default ProjectView;