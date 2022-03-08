import Image from 'next/image';

import useI18n from '../../../hooks/useI18n';
import SigninButton from "../Button";
import i18n from '../i18n';
import style from './style.module.css';

const SubmitDiv = ({ submitForm, isRegistering, toggleIsRegistering, googleLogin }) => {

    const {
        registerTxt,
        signinTxt,
        switchToRegisterTxt,
        switchToSigninTxt,
        signinWithGoogleTxt,
        orTxt
    } = useI18n(i18n);

    return (
        <>
            <div className="flex flex-row">
                <SigninButton
                    className={style.loginButton}
                    onClick={() => submitForm()}
                    type='submit'
                >
                    {isRegistering
                        ? registerTxt
                        : signinTxt
                    }
                </SigninButton>
                <button
                    className={style.createAccount}
                    onClick={toggleIsRegistering}
                >
                    {
                        isRegistering
                            ? switchToSigninTxt
                            : switchToRegisterTxt
                    }

                </button>
            </div>
            <p className="text-center text-gray-600 text-sm">{orTxt}</p>
            <SigninButton
                className={style.loginWithGoogle}
                onClick={googleLogin}
            >
                <div className="my-auto mx-5">
                    <Image src='/social_icons/google.png'
                        alt='google log-in'
                        width={20}
                        height={20}
                        layout='fixed'
                    />
                </div>
                {signinWithGoogleTxt}
            </SigninButton>
        </>

    );
}

export default SubmitDiv;