import useTailwindSize from '../../hooks/useTailwindSize';
import Desktop from './Desktop';
import Mobile from './mobile'

const NavBar = ({ onClick = () => { } }) => {
    const { isLg } = useTailwindSize();

    return (
        <div className="sticky w-full bg-black shadow-xl">
            {isLg
                ? <Desktop onClick={onClick} />
                : <Mobile onClick={onClick} />
            }
        </div>
    );
}

export default NavBar;