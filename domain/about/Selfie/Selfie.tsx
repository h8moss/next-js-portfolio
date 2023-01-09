import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface Props {
  description: string;
}

const Selfie = ({ description }: Props) => {
  const [beenRendered, setBeenRendered] = useState(false);

  return (
    <motion.div
      className="rounded-full my-3 w-80 h-80 mx-auto overflow-clip shadow-2xl"
      exit={{ scale: 0 }}
      animate={{ scale: beenRendered ? 1 : 0, rotate: beenRendered ? 0 : 90 }}
      whileInView={{ scale: 1, rotate: 0 }}
      onViewportEnter={() => setBeenRendered(true)}
    >
      <Image
        className="rotate-[39deg]"
        src="/selfie.jpg"
        layout="intrinsic"
        alt={description}
        width={320}
        height={320}
      />
    </motion.div>
  );
};

export default Selfie;
