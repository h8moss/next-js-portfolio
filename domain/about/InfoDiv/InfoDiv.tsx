import { motion } from "framer-motion";
import { HTMLProps, PropsWithChildren, useState } from "react";

import style from "./style.module.css";

interface Props extends HTMLProps<"div"> {
  leftAlign?: boolean;
}

const variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const InfoDiv = ({
  children,
  leftAlign = false,
  className,
}: PropsWithChildren<Props>) => {
  const alignStyle = leftAlign ? style.leftAlign : style.rightAlign;
  const [beenRendered, setBeenRendered] = useState(false);

  return (
    <motion.div
      className={`w-full ${className} ${alignStyle}`}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100,
        delay: 0.05,
        duration: 1,
      }}
      whileInView="visible"
      animate={beenRendered ? "visible" : "hidden"}
      onViewportEnter={() => setBeenRendered(true)}
      exit="hidden"
      variants={variants}
      initial="hidden"
    >
      <div>{children}</div>
    </motion.div>
  );
};

export default InfoDiv;
