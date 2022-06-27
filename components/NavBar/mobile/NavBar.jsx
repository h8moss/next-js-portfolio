import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import Logo from '../Logo';
import NavigationButtons from "../NavigationButtons";
import BurgerButton from "./BurgerButton";
import Modal from "./Modal";

const NavBar = ({ onClick }) => {

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="bg-black shadow-2xl w-screen bottom-0 fixed flex justify-end z-[98]">
                <button className="px-3" onClick={() => onClick('/')}>
                    <Logo />
                </button>
                <BurgerButton onClick={() => setShowModal(true)} />
            </div>
            <AnimatePresence>
                {showModal &&
                    <Modal
                        onClose={() => setShowModal(false)}
                    >
                        <NavigationButtons onClick={(v) => {
                            setShowModal(false);
                            onClick(v);
                        }} />
                    </Modal>
                }
            </AnimatePresence>
        </>
    );
};

export default NavBar;