import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import NavigationButtons from "../NavigationButtons";
import BurgerButton from "./BurgerButton";
import Modal from "./Modal";

const NavBar = ({ onClick }) => {

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="bg-black shadow-2xl w-screen absolute flex justify-end">
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