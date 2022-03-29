import { useRouter } from "next/router";

import Button from "../../Button";

const RouteButton = ({ children, route, onClick, highlightColor }) => {

    const router = useRouter()
    const currentRoute = router.pathname;

    const isHighlighted = currentRoute == route;

    return (
        <Button onClick={() => onClick(route)} color={isHighlighted && highlightColor}>
            {children}
        </Button>
    );
};

export default RouteButton;