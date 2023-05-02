import { motion } from "framer-motion";

const BlogBodyDiv = ({
  children,
}: React.PropsWithChildren<Record<never, never>>) => {
  return (
    <motion.div
      className="md:w-[65%] w-[95%] m-auto mt-10 min-h-screen"
      initial={{
        x: "100vw",
      }}
      animate={{
        x: "0",
      }}
      exit={{
        x: "-100vw",
      }}
    >
      {children}
    </motion.div>
  );
};
export default BlogBodyDiv;
