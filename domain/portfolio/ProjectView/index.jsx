import { AnimatePresence, motion } from "framer-motion";
import Image from 'next/image';

const ProjectView = ({ project }) => {

    const links = project.links ?? [];

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
                    <div className="flex-grow border-4 p-5 m-2 rounded-xl border-purple-400 whitespace-normal">
                        <p>
                            {project.description}
                        </p>
                        <div className="flex flex-row my-3">
                            {links.map((link) =>
                                <motion.a
                                    href={link.url}
                                    rel='noreferrer'
                                    target='_blank'
                                    key={link.url}
                                    className="bg-white p-1 rounded-lg mx-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Image
                                        alt={link.alt}
                                        src={link.imageSource}
                                        width='48'
                                        height='48'
                                    />
                                </motion.a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

export default ProjectView;