import { ErrorMessage, Field, Form, Formik } from "formik";
import { AnimatePresence } from "framer-motion";
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

import Card from '../components/Card';
import NavBar from "../components/NavBar";
import ScreenDiv from "../components/ScreenDiv";
import Toast from "../components/Toast";
import { i18n, Password2, SubmitDiv, Title } from "../domain/signin";
import send from '../domain/signin/api/send';
import validate from '../domain/signin/api/validate';
import useAuth from "../hooks/useAuth";
import useI18n from "../hooks/useI18n";
import useUser from "../hooks/useUser";

function Login() {

    const {
        registeringErrorMessage,
        signinErrorMessage,
        registerTxt,
        signinTxt,
        emailTxt,
        passwordTxt,
        errorMessages
    } = useI18n(i18n)

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
            <Head>
                <title>
                    {isRegistering ? registerTxt : signinTxt}
                </title>
            </Head>
            <Toast
                className='bg-red-500'
                message={showErrorToast ? (isRegistering ? registeringErrorMessage : signinErrorMessage) : ''}
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
                                validate={(values) => validate(values, isRegistering, errorMessages)}
                                onSubmit={(values, formik) =>
                                    send(values, auth, isRegistering, formik, () => setShowErrorToast(true))
                                }
                            >
                                {({ submitForm, isSubmitting, resetForm }) => (
                                    <Form >
                                        <Title>
                                            {isRegistering ? registerTxt : signinTxt}
                                        </Title>

                                        <label htmlFor="mail" >{emailTxt}</label>
                                        <Field name="mail" type='mail' />
                                        <ErrorMessage name="mail" component={'p'} />

                                        <label htmlFor="password" >{passwordTxt}</label>
                                        <Field name="password" type='password' />
                                        <ErrorMessage name="password" component={'p'} />

                                        <AnimatePresence>
                                            {isRegistering &&
                                                <Password2 />}
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