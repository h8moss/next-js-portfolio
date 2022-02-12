import { AnimatePresence, motion } from "framer-motion";

const noOpacity = {
    opacity: '0',
}

const yesOpacity = {
    opacity: '1',
}

const NotAllowed = ({ shouldStay, onExit }) => {

    return (
        <AnimatePresence
            onExitComplete={onExit}
        >
            {shouldStay &&
                <motion.div className="flex flex-col text-center"
                    initial={noOpacity}
                    exit={noOpacity}
                    animate={yesOpacity}
                >
                    You are not allowed here!
                    <span className='text-3xl'>
                        Are you lost?
                    </span>
                </motion.div>
            }
        </AnimatePresence>
    );
}

export default NotAllowed;