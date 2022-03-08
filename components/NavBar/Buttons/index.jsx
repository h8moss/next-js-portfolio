import useI18n from "../../../hooks/useI18n";
import useUser from "../../../hooks/useUser";
import StyledButton from "../../StyledButton";
import i18n from '../i18n';

const Buttons = ({ onClick, buttonSize = 16, buttonClass }) => {

    const user = useUser();
    const {
        about,
        blog,
        contact,
        portfolio,
        signin
    } = useI18n(i18n);

    return (
        <>
            <StyledButton
                color='#f00'
                onClick={() => onClick('/')}
                initialSize={buttonSize}
                className={buttonClass}
            >
                {about}
            </StyledButton>
            <StyledButton
                color='#3070fa'
                onClick={() => onClick('/portfolio')}
                initialSize={buttonSize}
                className={buttonClass}
            >
                {portfolio}
            </StyledButton>
            <StyledButton
                color='#aa85ff'
                onClick={() => onClick('/contact')}
                initialSize={buttonSize}
                className={buttonClass}
            >
                {contact}
            </StyledButton>
            <StyledButton
                color='#34ff94'
                onClick={() => onClick('/blog')}
                initialSize={buttonSize}
                className={buttonClass}
            >
                {blog}
            </StyledButton>
            {user === null &&
                <StyledButton
                    color='#ff0'
                    onClick={() => onClick('/signin')}
                    initialSize={buttonSize}
                    className={buttonClass}
                >
                    {signin}
                </StyledButton>
            }
        </>
    );
}

export default Buttons;