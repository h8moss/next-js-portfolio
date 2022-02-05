import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import style from '../styles/Components.module.css';

const useTagsList = () => {
    let scroll = useRef(null)

    let [hasPageLeft, setHasPageLeft] = useState(false);
    let [hasPageRight, setHasPageRight] = useState(false);

    const calculateHasPages = () => {
        setHasPageLeft(currentPage !== 0);
        setHasPageRight(
            currentPage * scroll.current.offsetWidth > scroll.current.scrollWidth
        );
    }
    useEffect(() => { setTimeout(calculateHasPages, 100) });

    let currentPage = 0;

    const pagePlus = (val) => {
        if (val + currentPage < 0) val = -currentPage;
        if ((val + currentPage) * scroll.current.offsetWidth < scroll.current.scrollWidth) {
            currentPage += val;
            scroll.current.scroll({
                top: 0,
                left: currentPage * scroll.current.offsetWidth,
                behaviour: 'smooth',
            })
        }
        calculateHasPages();
    }

    return {
        hasPageLeft: hasPageLeft,
        hasPageRight: hasPageRight,
        increasePage: () => pagePlus(1),
        decreasePage: () => pagePlus(-1),
        ref: scroll,
    }
}

export default function TagsList({ children, show }) {

    const tagsListObj = useTagsList();

    return (
        <div className="flex flex-row w-full">
            <button
                onClick={tagsListObj.decreasePage}
                className={tagsListObj.hasPageLeft && show ? '' : 'scale-0'}
            >
                <FiArrowLeft />
            </button>

            <div ref={tagsListObj.ref}
                className={style.tagsList + (show ? ' flex-grow' : ' w-0')}>
                {children}
            </div>

            <button
                onClick={tagsListObj.increasePage}
                className={tagsListObj.hasPageRight && show ? '' : 'scale-0'}
            >
                <FiArrowRight />
            </button>
        </div>

    );
}