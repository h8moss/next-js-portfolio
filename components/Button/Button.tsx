import { motion } from "framer-motion";

const Button = ({ onClick, className, ...props }) => {
  return (
    <motion.button
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      {...props}
      onClick={onClick}
      className={"p-3 accent-bg text-white rounded shadow-md " + className}
    />
  );
};

export default Button;
