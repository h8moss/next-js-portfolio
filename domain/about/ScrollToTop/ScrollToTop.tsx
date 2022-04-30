import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

import useTailwindSize from "../../../hooks/useTailwindSize";

interface Props {
  minScroll?: number;
  show: boolean;
}

const getSize = ({
  isLg,
  isMd,
  isSm,
  isXl,
  isXl2,
}: {
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  isXl2: boolean;
}): number => {
  if (isXl2) return 55;
  if (isXl) return 50;
  if (isLg) return 45;
  if (isMd) return 40;
  if (isSm) return 35;
  return 40;
};

const ScrollToTop = ({ minScroll = 100, show }: Props) => {
  const [trueShow, setTrueShow] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setTrueShow(window.scrollY > minScroll);
    };

    updateScroll();

    window.addEventListener("scroll", updateScroll);

    return () => window.removeEventListener("scroll", updateScroll);
  });

  const tailwindSize = useTailwindSize();

  const scrollBack = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {show && trueShow && (
        <motion.button
          className="rounded-lg shadow-lg accent-bg fixed bottom-3 right-3"
          onClick={scrollBack}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          exit={{ scale: 0 }}
        >
          <FiArrowUp className="text-white" size={getSize(tailwindSize)} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
