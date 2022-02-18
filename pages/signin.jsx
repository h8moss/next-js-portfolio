import { ErrorMessage, Field, Form, Formik } from "formik";
import { AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useState } from "react";

import Card from '../components/Card';
import NavBar from "../components/NavBar";
import ScreenDiv from "../components/ScreenDiv";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import style from '../styles/Login.module.css';

function Login() {

    let auth = useAuth();
    const user = useUser();

    let [isRegistering, setIsRegistering] = useState(false);

    let router = useRouter();

    let nextPage = router.query.goto ? router.query.goto : '/';

    if (user !== null) {
        router.push({ pathname: nextPage });
    }


    const googleLogin = async () => {
        try {
            await auth.signInWithGoogle();
        } catch {
            return;
        }
    }

    let [nextRoute, setNextRoute] = useState(router.pathname);

    let shouldStay = nextRoute === router.pathname;


    return (
        <>
            <NavBar
                onClick={(route) => setNextRoute(route)}
            />
            <ScreenDiv>
                <AnimatePresence
                    onExitComplete={() => router.push(nextRoute)}
                >
                    {shouldStay &&
                        <Card>
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
                                            <div className="my-auto mx-5">
                                                <Image src='/social_icons/google.png' alt=''
                                                    width={20}
                                                    height={20}
                                                    layout='fixed'
                                                />
                                            </div>
                                            Log in with google
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </Card>
                    }
                </AnimatePresence>
            </ScreenDiv>
        </>
    );
}

export default Login;