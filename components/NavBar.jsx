import StyledButton from './StyledButton';

export default function NavBar() {
    return (
        <div className='flex flex-row w-full justify-evenly absolute z-[99] top-3'>
            <StyledButton extraClass='hover:text-red-500' href='/'>About</StyledButton>
            <StyledButton extraClass='hover:text-yellow-500' href='/skills'>Skills</StyledButton>
            <StyledButton extraClass='hover:text-purple-500' href='/portfolio'>Portfolio</StyledButton>
            <StyledButton extraClass='hover:text-blue-500' href='/contact'>Contact</StyledButton>
        </div>
    );
};