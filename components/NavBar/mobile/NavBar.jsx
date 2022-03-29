import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

import Button from "../../Button";
import RouteButton from "../RouteButton";
import BurgerButton from "./BurgerButton";
import Modal from "./Modal";

const NavBar = ({ onClick }) => {

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="bg-black shadow-2xl w-screen sticky flex justify-end">
                <BurgerButton onClick={() => setShowModal(true)} />
            </div>
            <AnimatePresence>
                {showModal &&
                    <Modal
                        onClose={() => setShowModal(false)}
                        onClick={() => {
                            setShowModal(false);
                            onClick();
                        }}
                    >
                        <RouteButton highlightColor='#0f0' onClick={onClick} route={'/'}>Home</RouteButton>
                        <RouteButton highlightColor='#a0f' onClick={onClick} route={'/portfolio'}>Portfolio</RouteButton>
                        <RouteButton highlightColor='#f00' onClick={onClick} route={'/contact'}>Contact</RouteButton>
                        <RouteButton highlightColor='#ff0' onClick={onClick} route={'/blog'}>Blog</RouteButton>
                    </Modal>
                }
            </AnimatePresence>
        </>
    );
};

export default NavBar;