import { AnimatePresence, motion } from "framer-motion";

import TagButton from "./TagButton";

const TagList = ({ tags, onClick, getIndex, getVisibility, getSelected }) => {
    return (
        <motion.div
            className='flex overflow-auto bg-white rounded-xl my-2'
            initial={{ width: '0%', opacity: 0 }}
            exit={{ width: '0%', opacity: 0.1 }}
            animate={{ width: '100%', opacity: 1 }}
            transition={{
                damping: 100,
            }}
        >
            {tags.map((tag) => {
                let index = getIndex(tag);

                let isVisible = getVisibility(index)
                let isSelected = getSelected(index)

                return (
                    <AnimatePresence key={tag}>
                        {isVisible &&
                            <TagButton
                                onClick={() => onClick(index)}
                                isSelected={isSelected}
                                tag={tag}
                            />
                        }
                    </AnimatePresence>
                );
            })}
        </motion.div>
    );
}

export default TagList;