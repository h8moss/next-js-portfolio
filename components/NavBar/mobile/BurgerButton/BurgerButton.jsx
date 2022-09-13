import { FiMenu } from "react-icons/fi";

import useTailwindSize from '../../../../hooks/useTailwindSize';

const getSize = ({ isSm, isMd, isLg, isXl, isXl2 }) => {
    if (isXl2) return 100;
    if (isLg) return 80;
    if (isSm) return 45;
    return 55;
}

const BurgerButton = ({ onClick }) => {

    const size = getSize(useTailwindSize());

    return (
        <button className="m-3" onClick={onClick}>
            <FiMenu size={size} color='#fff' />
        </button>
    )
}

export default BurgerButton;