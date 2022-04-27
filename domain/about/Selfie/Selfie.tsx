import { motion } from "framer-motion";
import Image from "next/image";

const Selfie = () => {
  return (
    <motion.div
      className="border rounded-full my-3 w-80 h-80 mx-auto overflow-clip"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      <Image
        className="rotate-[39deg]"
        src="/selfie.jpg"
        layout="intrinsic"
        alt="Me at the wax museum of Veracruz with a wax statue of Obama"
        width={320}
        height={320}
      />
    </motion.div>
  );
};

export default Selfie;
