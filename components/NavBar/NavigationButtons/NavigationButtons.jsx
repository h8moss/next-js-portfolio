import useI18n from "../../../hooks/useI18n";
import RouteButton from "../RouteButton";
import i18n from "./i18n";

const NavigationButtons = ({ onClick }) => {

    const { about, blog, contact, portfolio } = useI18n(i18n);

    return (
        <>
            <RouteButton onClick={onClick} route={'/about'}>{about}</RouteButton>
            <RouteButton onClick={onClick} route={'/portfolio'}>{portfolio}</RouteButton>
            <RouteButton onClick={onClick} route={'/contact'}>{contact}</RouteButton>
            <RouteButton onClick={onClick} route={'/blog'}>{blog}</RouteButton>
        </>
    );
}

export default NavigationButtons;