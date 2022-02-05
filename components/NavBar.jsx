import { useUser } from '../services/firebase/auth';
import StyledButton from './StyledButton';
import UserButton from './UserButton';

export default function NavBar({ onClick = () => { }, delay = 0 }) {

    let user = useUser();

    return (
        <>
            <div className='flex flex-row w-full justify-evenly absolute z-[95] py-3 bg-zinc-900 shadow-xl'>
                <StyledButton
                    className='hover:text-red-500'
                    href='/'
                    delay={delay}
                    onStart={() => onClick('/')}
                >
                    About
                </StyledButton>
                <StyledButton
                    className='hover:text-blue-500'
                    href='/portfolio'
                    delay={delay}
                    onStart={() => onClick('/portfolio')}
                >
                    Portfolio
                </StyledButton>
                <StyledButton
                    className='hover:text-purple-500'
                    href='/contact'
                    delay={delay}
                    onStart={() => onClick('/contact')}
                >
                    Contact
                </StyledButton>

                <StyledButton
                    className='hover:text-green-500'
                    href='/blog'
                    delay={delay}
                    onStart={() => onClick('/blog')}
                >
                    Blog
                </StyledButton>
                {user === null
                    ? <StyledButton
                        className='hover:text-pink-500'
                        href='/signin'
                        delay={delay}
                        onStart={() => onClick('/signin')}
                    >
                        Sign in
                    </StyledButton>
                    : <UserButton />
                }

            </div>
        </>
    );
};