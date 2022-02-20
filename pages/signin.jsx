import { ErrorMessage, Field, Form, Formik } from "formik";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

import Card from '../components/Card';
import NavBar from "../components/NavBar";
import ScreenDiv from "../components/ScreenDiv";
import Toast from "../components/Toast";
import send from '../domain/signin/api/send';
import validate from '../domain/signin/api/validate';
import Password2 from "../domain/signin/Password2";
import SubmitDiv from "../domain/signin/SubmitDiv";
import SigninTitle from "../domain/signin/Title";
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

    const [showErrorToast, setShowErrorToast] = useState(false);

    useEffect(() => {
        let time = setTimeout(() => {
            if (showErrorToast) setShowErrorToast(false);
        }, 5000);
        return () => clearTimeout(time)
    }, [showErrorToast])

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
            <Toast
                className='bg-red-500'
                message={`Something went wrong, ${isRegistering ? 'please try again later' : 'make sure your username and password are correct'}`}
                show={showErrorToast && shouldStay}
                onDismiss={() => setShowErrorToast(false)}
            />
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
                                }}
                                validate={(values) => validate(values, isRegistering)}
                                onSubmit={(values, formik) =>
                                    send(values, auth, isRegistering, formik, () => setShowErrorToast(true))
                                }
                            >
                                {({ submitForm, isSubmitting, resetForm }) => (
                                    <Form className={style.form}>
                                        <SigninTitle>
                                            {isRegistering ? 'Register' : 'Log in'}
                                        </SigninTitle>

                                        <label htmlFor="mail" >Email</label>
                                        <Field name="mail" type='mail' />
                                        <ErrorMessage name="mail" component={'p'} className={style.error} />

                                        <label htmlFor="password" >Password</label>
                                        <Field name="password" type='password' />
                                        <ErrorMessage name="password" component={'p'} className={style.error} />

                                        <AnimatePresence>
                                            {isRegistering &&
                                                <Password2
                                                    className={style.error}
                                                />}
                                        </AnimatePresence>

                                        {!isSubmitting &&
                                            <SubmitDiv
                                                googleLogin={googleLogin}
                                                isRegistering={isRegistering}
                                                submitForm={submitForm}
                                                toggleIsRegistering={() => {
                                                    setIsRegistering(!isRegistering)
                                                    resetForm();
                                                }}
                                            />
                                        }
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