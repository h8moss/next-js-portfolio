import { motion } from "framer-motion";

import useTheme from "../../../../hooks/useTheme";
import ModalBackground from "./ModalBackground";


const variants =
{
    'hidden': {
        x: '100vw'
    },
    'visible': {
        x: 0
    }
}

const Modal = ({ onClose, children }) => {

    const theme = useTheme();

    return (
        <ModalBackground onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                <motion.div
                    className={"w-1/2 absolute top-0 right-0 flex flex-col justify-end h-screen " + theme.highlightBgColorClass}
                    variants={variants}
                    initial='hidden'
                    exit='hidden'
                    animate='visible'

                >
                    {children}
                </motion.div>
            </div>
        </ModalBackground >
    );
};

export default Modal;