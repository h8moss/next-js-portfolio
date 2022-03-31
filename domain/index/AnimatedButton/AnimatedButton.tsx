import { HTMLMotionProps, motion } from "framer-motion";

import Button from "../../../components/Button";

interface Props extends HTMLMotionProps<"button"> {}

const variants = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};

const AnimatedButton = (props: Props) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      exit="hidden"
      animate="visible"
      className="p-2"
    >
      <Button {...props} />
    </motion.div>
  );
};

export default AnimatedButton;
