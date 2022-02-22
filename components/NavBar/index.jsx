import { useContext } from 'react';

import AuthContext from '../../context/auth';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import StyledButton from '../StyledButton';
import UserButton from './UserButton';

export default function NavBar({ onClick }) {
    const auth = useContext(AuthContext);

    let user = useUser();

    return (
        <>
            <div className='flex flex-row w-full justify-evenly absolute z-[95] py-3 bg-zinc-900 shadow-xl'>
                <StyledButton
                    color='#f00'
                    onClick={() => onClick('/')}
                >
                    About
                </StyledButton>
                <StyledButton
                    color='#3070fa'
                    onClick={() => onClick('/portfolio')}
                >
                    Portfolio
                </StyledButton>
                <StyledButton
                    color='#aa85ff'
                    onClick={() => onClick('/contact')}
                >
                    Contact
                </StyledButton>
                <StyledButton
                    color='#34ff94'
                    onClick={() => onClick('/blog')}
                >
                    Blog
                </StyledButton>
                {user === null
                    ? <StyledButton
                        color='#ff0'
                        onClick={() => onClick('/signin')}
                        className='top-3 right-3 absolute '
                    >
                        Sign in
                    </StyledButton>
                    : <UserButton />
                }

            </div>
        </>
    );
};