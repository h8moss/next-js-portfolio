import { AnimatePresence } from "framer-motion";

import TagButton from "./TagButton";

const TagList = ({ tags, onClick, getIndex, getVisibility, getSelected }) => {
    return (
        <div className='flex overflow-auto w-full'>
            {tags.map((tag) => {
                let index = getIndex(tag);

                let isVisible = getVisibility
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
        </div>
    );
}

export default TagList;