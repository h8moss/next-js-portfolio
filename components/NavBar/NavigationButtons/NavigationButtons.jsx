import RouteButton from "../RouteButton";

const NavigationButtons = ({ onClick }) => {
    return (
        <>
            <RouteButton highlightColor='#0f0' onClick={onClick} route={'/'}>Home</RouteButton>
            <RouteButton highlightColor='#a0f' onClick={onClick} route={'/portfolio'}>Portfolio</RouteButton>
            <RouteButton highlightColor='#f00' onClick={onClick} route={'/contact'}>Contact</RouteButton>
            <RouteButton highlightColor='#ff0' onClick={onClick} route={'/blog'}>Blog</RouteButton>
        </>
    );
}

export default NavigationButtons;