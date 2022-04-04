import { HTMLMotionProps, motion } from "framer-motion";

interface Props extends HTMLMotionProps<"button"> {}

const FlatButton = ({
  onClick,
  children,
  color,
  className,
  ...props
}: Props) => {
  return (
    <motion.button
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      className={"p-3 " + className}
      style={{ color }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default FlatButton;
