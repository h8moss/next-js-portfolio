import useUser from "../../../hooks/useUser";
import StyledButton from "../../StyledButton";
import UserButton from "../UserButton";

const Buttons = ({ onClick, buttonSize = 16, buttonClass }) => {

    const user = useUser();

    return (
        <>
            <StyledButton
                color='#f00'
                onClick={() => onClick('/')}
                initialSize={buttonSize}
                className={buttonClass}
            >
                About
            </StyledButton>
            <StyledButton
                color='#3070fa'
                onClick={() => onClick('/portfolio')}
                initialSize={buttonSize}
                className={buttonClass}
            >
                Portfolio
            </StyledButton>
            <StyledButton
                color='#aa85ff'
                onClick={() => onClick('/contact')}
                initialSize={buttonSize}
                className={buttonClass}
            >
                Contact
            </StyledButton>
            <StyledButton
                color='#34ff94'
                onClick={() => onClick('/blog')}
                initialSize={buttonSize}
                className={buttonClass}
            >
                Blog
            </StyledButton>
            {user === null &&
                <StyledButton
                    color='#ff0'
                    onClick={() => onClick('/signin')}
                    initialSize={buttonSize}
                    className={buttonClass}
                >
                    Sign in
                </StyledButton>
            }
        </>
    );
}

export default Buttons;