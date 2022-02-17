import { motion } from "framer-motion";

const ProjectListTile = ({ project, onClick }) => {
    return (
        <motion.button
            layoutId={project.title}
            initial={{ opacity: 0, backgroundColor: '#fff', fontSize: '1rem' }}
            animate={{ opacity: 1, scaleY: 1, backgroundColor: '#fff', fontSize: '1rem' }}
            exit={{ scaleY: 0 }}
            whileHover={{ backgroundColor: '#ddd', fontSize: '1.2rem' }}
            className='text-black py-5 border-b-2 border-gray-400'
            onClick={onClick}
        >
            {project.title}
        </motion.button>
    );
}

export default ProjectListTile;