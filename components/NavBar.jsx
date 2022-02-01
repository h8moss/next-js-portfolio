import StyledButton from './StyledButton';

export default function NavBar({ onClick = () => { }, delay = 0 }) {
    return (
        <div className='flex flex-row w-full justify-evenly absolute z-[99] top-3'>
            <StyledButton
                extraClass='hover:text-red-500'
                href='/'
                delay={delay}
                onStart={() => onClick('/')}
            >
                About
            </StyledButton>
            <StyledButton
                extraClass='hover:text-blue-500'
                href='/portfolio'
                delay={delay}
                onStart={() => onClick('/portfolio')}
            >
                Portfolio
            </StyledButton>
            <StyledButton
                extraClass='hover:text-purple-500'
                href='/contact'
                delay={delay}
                onStart={() => onClick('/contact')}
            >
                Contact
            </StyledButton>

            <StyledButton
                extraClass='hover:text-green-500'
                href='/blog'
                delay={delay}
                onStart={() => onClick('/blog')}
            >
                Blog
            </StyledButton>

        </div>
    );
};