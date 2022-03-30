import NavigationButtons from '../NavigationButtons';

const NavBar = ({ onClick }) => {
    return (
        <div className="flex flex-row bg-black shadow-2xl top-0 sticky w-full justify-around">
            <NavigationButtons onClick={onClick} />
        </div>
    )
}

export default NavBar;