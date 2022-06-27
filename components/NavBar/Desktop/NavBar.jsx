import Logo from '../Logo';
import NavigationButtons from '../NavigationButtons';

const NavBar = ({ onClick }) => {
    return (
        <div className="flex flex-row bg-black shadow-2xl top-0 sticky w-full z-[99]">
            <div className='flex-grow flex justify-center'>
                <button className='m-auto' onClick={() => onClick('/')}>
                    <Logo />
                </button>
            </div>
            <div className='flex-grow-[2] flex justify-around '>
                <NavigationButtons onClick={onClick} />
            </div>
        </div>
    )
}

export default NavBar;