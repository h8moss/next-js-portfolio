import RouteButton from "../RouteButton";

const NavigationButtons = ({ onClick }) => {
    return (
        <>
            <RouteButton onClick={onClick} route={'/'}>Home</RouteButton>
            <RouteButton onClick={onClick} route={'/portfolio'}>Portfolio</RouteButton>
            <RouteButton onClick={onClick} route={'/contact'}>Contact</RouteButton>
            <RouteButton onClick={onClick} route={'/blog'}>Blog</RouteButton>
        </>
    );
}

export default NavigationButtons;