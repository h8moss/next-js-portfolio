import useWindowSize from "./useWindowSize";

const useTailwindSize = ({ sm = 640, md = 768, lg = 1024, xl = 1280, xl2 = 1536 } = {}) => {
    const [size] = useWindowSize();

    return {
        isSm: size >= sm,
        isMd: size >= md,
        isLg: size >= lg,
        isXl: size >= xl,
        isXl2: size >= xl2,
    }

}

export default useTailwindSize;