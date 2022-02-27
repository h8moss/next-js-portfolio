import { useEffect, useState } from "react";

const useWindowSize = () => {
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
    const [currentHeight, setCurrentHeight] = useState(window.innerHeight);

    useEffect(() => {
        const onChange = () => {
            setCurrentWidth(window.innerWidth);
            setCurrentHeight(window.innerHeight);
        }

        window.addEventListener('resize', onChange);

        return () => window.removeEventListener('resize', onChange);
    });

    return [currentWidth, currentHeight];
}

export default useWindowSize;