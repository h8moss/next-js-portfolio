import { AnimatePresence, motion } from "framer-motion";
import { HTMLProps } from "react";
import { FiX } from "react-icons/fi";

interface Props extends HTMLProps<HTMLButtonElement> {
  message: string | null;
  onDismiss: () => void;
}

const Toast = ({ className, message, onDismiss }: Props) => {
  const show = !!message; // if message is falsy, shouldn't show.

  return (
    <div className="w-screen h-screen fixed top-0 left-0 overflow-clip pointer-events-none">
      <AnimatePresence>
        {show && (
          <motion.div
            className={
              "w-80 p-4 rounded-xl absolute flex flex-col pointer-events-auto left-5 bottom-5 " +
              className
            }
            initial={{
              x: "-100vw",
            }}
            animate={{
              x: "0",
            }}
            exit={{
              x: "100vw",
            }}
          >
            <button
              className="rounded-xl bg-white 
                                bg-opacity-0 hover:bg-opacity-20 w-min p-2"
              onClick={() => onDismiss()}
            >
              <FiX />
            </button>
            <p>{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export type { Props };

export default Toast;
