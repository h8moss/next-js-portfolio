import { useRouter } from "next/router";

import FlatButton from "../../FlatButton";

const RouteButton = ({ children, route, onClick }) => {

    const router = useRouter()
    const currentRoute = router.pathname;

    const isHighlighted = currentRoute == route;

    return (
        <FlatButton onClick={() => onClick(route)} className={isHighlighted && 'accent-text'}>
            {children}
        </FlatButton>
    );
};

export default RouteButton;