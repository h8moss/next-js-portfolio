import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

import useUser from '../../hooks/useUser';
import StyledButton from '../StyledButton';
import Buttons from './Buttons';
import UserButton from './UserButton';

export default function NavBar({ onClick }) {
    const [showMenu, setShowMenu] = useState(false);
    const user = useUser();

    return (
        <>
            <div className='  absolute z-[95] py-3 bg-zinc-900 shadow-xl w-full'>
                <div className='md:scale-100 scale-0 flex flex-row w-full justify-evenly'>
                    <Buttons onClick={onClick} />
                </div>
                <motion.button
                    onClick={() => setShowMenu((state) => !state)} className='md:scale-0 scale-100 absolute top-0 left-0 m-3'>
                    <FiMenu height={40} width={40} />
                </motion.button>
            </div>

            <AnimatePresence>
                {showMenu &&
                    <div className='bg-opacity-50 fixed top-0 left-0 w-screen h-screen z-[99]'
                        onClick={() => setShowMenu(false)}

                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className='flex flex-col bg-slate-500 w-36 justify-center'
                            initial={{ x: '-200px' }}
                            animate={{ x: '0px' }}
                            exit={{ x: '-200px' }}
                        >
                            <Buttons
                                buttonSize={24}
                                buttonClass='py-3'
                                onClick={(route) => {
                                    setShowMenu(false);
                                    onClick(route);
                                }}
                            />
                        </motion.div>
                    </div>
                }
            </AnimatePresence>
            {user !== null &&
                <UserButton />
            }
        </>
    );
};