import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiX } from "react-icons/fi";

import TagButton from "../../TagButton";
import FilterButton from "./FilterButton";

const MobileTagFilter = ({ tags, getSelected, getIndex, getVisibility, onClick }) => {

    const [showMenu, setShowMenu] = useState(false);

    const tagComponents = tags.map((tag) => {
        let index = getIndex(tag);
        return (
            <AnimatePresence key={tag}>
                {getVisibility(index) &&
                    <TagButton
                        isSelected={getSelected(index)}
                        onClick={() => onClick(index)}
                        tag={tag}
                    />
                }
            </AnimatePresence>
        );
    })

    return (
        <>
            <FilterButton onClick={() => setShowMenu(true)} />
            <AnimatePresence>
                {showMenu &&
                    <div className="top-0 left-0 w-screen h-screen fixed z-[95] flex"
                        onClick={() => setShowMenu(false)}
                    >
                        <div onClick={(e) => e.stopPropagation()} className='h-min my-auto'>
                            <motion.div
                                className="bg-white m-5 rounded-lg z-[96] flex flex-col h-64 overflow-auto text-black shadow-2xl"
                                initial={{ x: '-100vw' }}
                                animate={{ x: '0vw' }}
                                exit={{ x: '100vw' }}
                            >
                                <button
                                    className="w-min"
                                    onClick={() => setShowMenu(false)}
                                >
                                    <FiX size={30} />
                                </button>
                                <div className="flex flex-row flex-wrap flex-grow">
                                    {tagComponents}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                }
            </AnimatePresence>
        </>
    );
}

export default MobileTagFilter;