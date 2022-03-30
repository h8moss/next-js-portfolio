import Image from 'next/image';

import NavigationButtons from '../NavigationButtons';

const NavBar = ({ onClick }) => {
    return (
        <div className="flex flex-row bg-black shadow-2xl top-0 sticky w-full">
            <div className='flex-grow flex justify-center'>
                <button className='m-auto' onClick={() => onClick('/')}>
                    <Image
                        alt='icon'
                        width={30}
                        height={30}
                        src='/icon.png'
                    />
                </button>
            </div>
            <div className='flex-grow-[2] flex justify-around '>
                <NavigationButtons onClick={onClick} />
            </div>
        </div>
    )
}

export default NavBar;