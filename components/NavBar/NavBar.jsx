import useTailwindSize from '../../hooks/useTailwindSize';
import Desktop from './Desktop';
import Mobile from './mobile'

const NavBar = ({ onClick = () => { } }) => {
    const { isLg } = useTailwindSize();

    return (
        <>
            {isLg
                ? <Desktop onClick={onClick} />
                : <Mobile onClick={onClick} />
            }
        </>
    );
}

export default NavBar;