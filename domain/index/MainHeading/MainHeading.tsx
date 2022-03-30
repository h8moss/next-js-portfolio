import { motion } from "framer-motion";

const MainHeading = () => {
  return (
    <motion.h1
      className="p-5"
      initial={{ opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100vw" }}
    >
      My name is Daniel Armenta
    </motion.h1>
  );
};

export default MainHeading;
