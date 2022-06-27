import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface Props extends HTMLMotionProps<"button"> {}

const Button = ({ className, disabled, ...props }: Props) => {
  return (
    <motion.button
      {...props}
      animate={{ scale: 1 }}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      className={
        "p-3 accent-bg text-white rounded shadow-md disabled:bg-gray-600 " +
        className
      }
      disabled={disabled}
    />
  );
};

export default Button;
