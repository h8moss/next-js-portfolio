import { motion } from "framer-motion";
import { useRouter } from "next/router";

import FlatButton from "../../../FlatButton";
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

    return (
        <ModalBackground onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                <motion.div
                    className="bg-zinc-600 w-1/2 absolute top-0 right-0 flex flex-col justify-end h-screen"
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