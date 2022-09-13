import useTheme from '../../../hooks/useTheme';
import Logo from '../Logo';
import NavigationButtons from '../NavigationButtons';

const NavBar = ({ onClick }) => {
    const theme = useTheme();

    return (
        <div className={"flex flex-row shadow-2xl top-0 sticky w-full z-[99] " + theme.highlightBgColorClass}>
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