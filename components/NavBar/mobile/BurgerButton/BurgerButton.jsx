import { FiMenu } from "react-icons/fi";

import useTailwindSize from '../../../../hooks/useTailwindSize';

const getSize = ({ isSm, isMd, isLg, isXl, isXl2 }) => {
    if (isXl2) return 100;
    if (isXl) return 80;
    if (isLg) return 80;
    if (isMd) return 70;
    if (isSm) return 70;
    return 60;
}

const BurgerButton = ({ onClick }) => {

    const size = getSize(useTailwindSize());

    return (
        <button className="m-3" onClick={onClick}>
            <FiMenu size={size} />
        </button>
    )
}

export default BurgerButton;