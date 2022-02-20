import { ErrorMessage, Field, Form, Formik } from "formik";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useState } from "react";

import Card from '../components/Card';
import NavBar from "../components/NavBar";
import ScreenDiv from "../components/ScreenDiv";
import SigninButton from "../domain/signin/Button";
import SigninTitle from "../domain/signin/Title";
import send from '../domain/signin/api/send';
import validate from '../domain/signin/api/validate';
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
                                    password2: '',
                                    isRegistering: isRegistering,
                                }}
                                validate={validate}
                                onSubmit={(values, formik) => send(values, auth, formik)}
                            >
                                {() => (
                                    <Form className={style.form}>
                                        <SigninTitle>
                                            {isRegistering ? 'Register' : 'Log in'}
                                        </SigninTitle>
                                        <label htmlFor="mail" >Email</label>
                                        <Field name="mail" type='mail' />
                                        <ErrorMessage name="mail" component={'p'} />
                                        <label htmlFor="password" >Password</label>
                                        <Field name="password" type='password' />
                                        <ErrorMessage name="password" component={'p'} />
                                        <AnimatePresence>
                                            {isRegistering &&
                                                <motion.div className='flex flex-col overflow-clip'
                                                    initial={{ height: 0 }}
                                                    exit={{ height: 0 }}
                                                    animate={{ height: '100px' }}
                                                >
                                                    <label htmlFor="password" >Repeat password</label>
                                                    <Field name="password2" type='password' />
                                                    <ErrorMessage name="password2" component={'p'} />
                                                </motion.div>
                                            }
                                        </AnimatePresence>

                                        <div className="flex flex-row">
                                            <SigninButton className={style.loginButton}>
                                                {isRegistering
                                                    ? 'Sign up'
                                                    : 'Log in'
                                                }
                                            </SigninButton>
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
                                        <SigninButton className={style.loginWithGoogle} onClick={googleLogin}>
                                            <div className="my-auto mx-5">
                                                <Image src='/social_icons/google.png' alt=''
                                                    width={20}
                                                    height={20}
                                                    layout='fixed'
                                                />
                                            </div>
                                            Log in with google
                                        </SigninButton>
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