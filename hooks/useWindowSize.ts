import { useEffect, useState } from "react";

const useWindowSize = () => {
    const [currentWidth, setCurrentWidth] = useState(0);
    const [currentHeight, setCurrentHeight] = useState(0);

    useEffect(() => {
        const onChange = () => {
            setCurrentWidth(window.innerWidth);
            setCurrentHeight(window.innerHeight);
        }

        onChange();
        window.addEventListener('resize', onChange);

        return () => window.removeEventListener('resize', onChange);
    }, []);

    return [currentWidth, currentHeight];
}

export default useWindowSize;