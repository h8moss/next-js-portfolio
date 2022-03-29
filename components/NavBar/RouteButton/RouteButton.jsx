import { useRouter } from "next/router";

import Button from "../../Button";

const RouteButton = ({ children, route, onClick }) => {

    const router = useRouter()
    const currentRoute = router.pathname;

    const isHighlighted = currentRoute == route;

    return (
        <Button onClick={() => onClick(route)} className={isHighlighted && 'accent-text'}>
            {children}
        </Button>
    );
};

export default RouteButton;