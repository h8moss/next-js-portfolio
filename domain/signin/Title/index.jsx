import { AnimatePresence, motion } from "framer-motion";

const SigninTitle = ({ children }) => {

    const text = String(children)

    return (
        <AnimatePresence exitBeforeEnter initial={false}>
            <motion.h1
                className="text-4xl py-2"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}

                key={text}
            >
                {text}
            </motion.h1>
        </AnimatePresence>
    );
}

export default SigninTitle;