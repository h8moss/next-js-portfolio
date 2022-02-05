import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from 'next/router'
import { useState } from "react";
import WithWillExit from "../components/WithWillExit";
import { getAuthService, useUser } from "../services/firebase/auth";
import style from '../styles/Login.module.css';

function Login({ willExit }) {
    const user = useUser();

    let [isRegistering, setIsRegistering] = useState(false);

    let router = useRouter();

    let nextPage = router.query.goto ? router.query.goto : '/';

    if (user !== null) {
        router.push({ pathname: nextPage });
    }

    const googleLogin = async () => {
        let authService = getAuthService();
        try {
            await authService.signInWithGoogle();
        } catch {
            return;
        }
    }

    return (
        <div className="w-screen h-screen p-20">
            <div className="bg-white mx-auto rounded-lg shadow-xl text-gray-800 text-center w-1/2 h-full flex flex-col">
                <Formik
                    initialValues={{
                        mail: '',
                        password: '',
                    }}
                    validate={() => { }}
                    onSubmit={() => { }}
                >
                    {() => (
                        <Form className={style.form}>
                            <h1 className="text-4xl">{isRegistering ? 'Register' : 'Log in'}</h1>
                            <label htmlFor="mail" >Email</label>
                            <Field name="mail" type='mail' />
                            <ErrorMessage name="mail" component={'p'} />
                            <label htmlFor="password" >Password</label>
                            <Field name="password" type='password' />
                            <ErrorMessage name="password" component={'p'} />
                            <div className={'transition-all flex flex-col overflow-clip ' + (isRegistering ? 'h-20' : 'h-0')}>
                                <label htmlFor="password" >Repeat password</label>
                                <Field name="password2" type='password' />
                                <ErrorMessage name="password2" component={'p'} />
                            </div>
                            <div className="flex flex-row">
                                <button className={style.loginButton}>Log in</button>
                                <button
                                    className={style.createAccount}
                                    onClick={() => setIsRegistering(!isRegistering)}
                                >
                                    {
                                        isRegistering
                                            ? "Already have an account? Log in"
                                            : "Don't have an account? Create one"
                                    }

                                </button>
                            </div>
                            <p className="text-center text-gray-600 text-sm">or</p>
                            <button className={style.loginWithGoogle} onClick={googleLogin}>
                                <img src='/social_icons/google.png' alt='' />
                                Log in with google
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default () => WithWillExit(Login);