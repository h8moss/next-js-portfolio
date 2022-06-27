import { HTMLMotionProps, motion } from "framer-motion";

import useTailwindSize from "../../hooks/useTailwindSize";

interface Props extends HTMLMotionProps<"div"> {}

const Card = ({ className, children, ...props }: Props) => {
  const { isMd } = useTailwindSize();

  const width = isMd ? "70%" : "95%";

  return (
    <motion.div
      className={
        `bg-white shadow-lg
                        rounded-lg mx-auto text-gray-800
                        my-4 flex flex-col ` + className
      }
      initial={{
        overflow: "clip",
        padding: "0px",
        height: "0",
        minHeight: "0",
      }}
      animate={{
        overflow: "auto",
        padding: "20px",
        width: width,
        height: "auto",
        minHeight: "100%",
      }}
      exit={{
        overflow: "cli,",
        padding: "0px",
        width: "0px",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
