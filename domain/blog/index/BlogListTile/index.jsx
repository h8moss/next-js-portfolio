import { motion } from "framer-motion";

import { getAgoString } from "../../../../services/dateOperations";
import fonts from '../../../../styles/fonts.module.css';

const BlogListTile = ({ dateCreated, title, tags, onClick }) => {

    const agoString = dateCreated !== null
        ? getAgoString(dateCreated)
        : null;

    return (
        <motion.button
            className="flex flex-col mx-auto rounded-md shadow-2xl p-3 w-full my-2 bg-white group"
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            whileHover={{ scale: 1.02 }}
        >
            {dateCreated &&
                <p className="text-sm text-gray-400">
                    {`${dateCreated.toLocaleDateString()} (${agoString})`}
                </p>
            }
            <h2 className="text-3xl transition-colors whitespace-nowrap group-hover:text-purple-400">
                {title}
            </h2>
            <div className="flex flex-row">
                {tags}
            </div>
        </motion.button>
    )

    return (
        <button
            className="bg-white text-black flex flex-col 
                mx-auto rounded-md shadow-2xl drop-shadow-lg 
                p-3 w-full my-2 hover:scale-x-[1.02] transition-all group"
            onClick={onClick}
        >
            {dateCreated &&
                <p className="text-sm text-gray-600">
                    {`${dateCreated.toLocaleDateString()} (${agoString})`}
                </p>
            }
            <h2
                className={`${fonts.outfit} text-3xl transition-all 
                group-hover:text-purple-400 whitespace-nowrap`}
            >
                {title}
            </h2>
            <div className="flex flex-row">
                {tags}
            </div>
        </button>
    );
}

export default BlogListTile;