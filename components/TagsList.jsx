import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function TagsList({ children, show }) {
    let scroll = useRef(null)

    let [hasPageLeft, setHasPageLeft] = useState(false);
    let [hasPageRight, setHasPageRight] = useState(false);

    const calculateHasPages = () => {
        setHasPageLeft(currentPage !== 0);
        setHasPageRight(currentPage * scroll.current.offsetWidth > scroll.current.scrollWidth);
    }
    useEffect(() => { setTimeout(calculateHasPages, 100) });


    let currentPage = 0;

    const scroller = () => scroll.current.scroll(100, 0);
    const getPageSize = () => scroll.current.offsetWidth;

    const pageUp = () => {

    }

    const pagePlus = (val) => {
        if (val + currentPage < 0) val = -currentPage;
        if ((val + currentPage) * scroll.current.offsetWidth < scroll.current.scrollWidth) {
            console.log({
                val: val,
                currentPage: currentPage,
                offsetWidth: scroll.current.offsetWidth,
                left: currentPage * scroll.current.offsetWidth,
            })
            currentPage += val;
            scroll.current.scroll({
                top: 0,
                left: currentPage * scroll.current.offsetWidth,
                behaviour: 'smooth',
            })
        }
        calculateHasPages();
    }

    return (
        <div className="flex flex-row w-full">
            <button onClick={() => pagePlus(-1)} className={hasPageLeft && show ? '' : 'scale-0'}><FiArrowLeft /></button>
            <div ref={scroll} className={"my-3 flex flex-row rounded-3xl overflow-x-hidden overflow-y-clip transition-all bg-gray-300 shadow-xl h-10 " + (show ? 'flex-grow' : 'w-0')}>
                {children}
            </div>
            <button onClick={() => pagePlus(1)} className={hasPageRight && show ? '' : 'scale-0'}><FiArrowRight /></button>
        </div>

    );
}