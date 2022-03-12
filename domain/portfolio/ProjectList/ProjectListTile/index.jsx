import { motion } from "framer-motion";

import useLocale from "../../../../hooks/useLocale";

const ProjectListTile = ({ project, onClick }) => {

    const locale = useLocale();

    return (
        <motion.button
            layoutId={project.title}
            initial={{ opacity: 0, backgroundColor: '#fff', fontSize: '1rem' }}
            animate={{ opacity: 1, scaleY: 1, backgroundColor: '#fff', fontSize: '1rem' }}
            exit={{ scaleY: 0 }}
            whileHover={{ backgroundColor: '#ddd', fontSize: '1.2rem' }}
            className='text-black py-5 border-b-2 border-gray-400 flex flex-col px-3 w-full overflow-x-auto overflow-y-clip'
            onClick={onClick}
        >
            {project.title[locale]}
            <div className="flex flex-row text-xs">
                {project.tags.map((v) =>
                    <p
                        key={v}
                        className="bg-gray-600 text-white p-1 mx-1 rounded-md whitespace-nowrap"
                    >
                        {v}
                    </p>
                )}
            </div>
        </motion.button>
    );
}

export default ProjectListTile;