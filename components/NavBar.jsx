import StyledButton from './StyledButton';

export default function NavBar({ onClick, delay }) {
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
                extraClass='hover:text-yellow-500'
                href='/skills'
                delay={delay}
                onStart={() => onClick('/skills')}
            >
                Skills
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
        </div>
    );
};