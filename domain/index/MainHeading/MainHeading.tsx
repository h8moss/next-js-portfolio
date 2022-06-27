import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

const MainHeading = ({ children }: PropsWithChildren<{}>) => {
  return (
    <motion.h1
      className="p-5"
      initial={{ opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100vw" }}
    >
      {children}
    </motion.h1>
  );
};

export default MainHeading;
