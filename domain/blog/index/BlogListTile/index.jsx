import { motion } from "framer-motion";

import useI18n from "../../../../hooks/useI18n";
import { getAgoString } from "../../../../services/dateOperations";
import i18n from '../../i18n';

const BlogListTile = ({ dateCreated, title, tags, onClick }) => {

    const { dateOp } = useI18n(i18n);

    const agoString = dateCreated !== null
        ? getAgoString(dateCreated, dateOp)
        : null;

    return (
        <motion.button
            className="flex flex-col mx-auto rounded-md shadow-2xl p-3 w-full my-2 bg-white group"
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            whileHover={{ scale: 1.02 }}
            onClick={onClick}
        >
            {dateCreated &&
                <p className="text-sm text-gray-400">
                    {`${dateCreated.toLocaleDateString()} (${agoString})`}
                </p>
            }
            <h2 className="text-3xl transition-colors md:whitespace-nowrap group-hover:text-purple-400 text-left">
                {title}
            </h2>
            <div className="flex flex-row">
                {tags}
            </div>
        </motion.button>
    )

}

export default BlogListTile;