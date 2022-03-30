import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface Props extends HTMLMotionProps<"button"> {}

const Button = ({ className, ...props }: Props) => {
  return (
    <motion.button
      {...props}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className={"p-3 accent-bg text-white rounded shadow-md " + className}
    />
  );
};

export default Button;
