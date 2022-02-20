import Image from 'next/image';

import SigninButton from "../Button";
import style from './style.module.css';

const SubmitDiv = ({ submitForm, isRegistering, toggleIsRegistering, googleLogin }) => {
    return (
        <>
            <div className="flex flex-row">
                <SigninButton
                    className={style.loginButton}
                    onClick={() => submitForm()}
                    type='submit'
                >
                    {isRegistering
                        ? 'Sign up'
                        : 'Log in'
                    }
                </SigninButton>
                <button
                    className={style.createAccount}
                    onClick={toggleIsRegistering}
                >
                    {
                        isRegistering
                            ? "Already have an account? Log in"
                            : "Don't have an account? Create one"
                    }

                </button>
            </div>
            <p className="text-center text-gray-600 text-sm">or</p>
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
                Log in with google
            </SigninButton>
        </>

    );
}

export default SubmitDiv;