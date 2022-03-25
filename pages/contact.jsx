import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import Head from 'next/head';
import { useEffect, useState } from "react";

import NavBar from '../components/NavBar';
import ScreenDiv from '../components/ScreenDiv';
import Toast from "../components/Toast";
import { ContactForm, Heading, i18n } from "../domain/contact";
import send from '../domain/contact/api/send';
import useI18n from "../hooks/useI18n";

const Contact = () => {
    const [errorToastTxt, setErrorToastTxt] = useState('');
    const [successToastTxt, setSuccessToastTxt] = useState('');

    const router = useRouter();
    const [nextRoute, setNextRoute] = useState(router.pathname);

    const {
        heading,
        title,
        errorMessage,
        successMessage,
        metaDescription
    } = useI18n(i18n)

    useEffect(() => {
        let time = setTimeout(() => {
            if (errorToastTxt != '') setErrorToastTxt('');
            if (successToastTxt != '') setSuccessToastTxt('');
        }, 5000);
        return () => clearTimeout(time)
    }, [errorToastTxt, successToastTxt]);


    const mySend = (data, formik) => {
        send(
            data,
            formik,
            () => { setSuccessToastTxt(successMessage) },
            () => { setSuccessToastTxt(errorMessage) }
        );
    }

    const shouldShow = router.pathname === nextRoute;
    if (!shouldShow) {
        setErrorToastTxt('');
        setSuccessToastTxt('');
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name='description'
                    content={metaDescription}
                />
            </Head>
            <NavBar
                onClick={(route) => setNextRoute(route)}
            />
            <Toast
                className='bg-green-500'
                message={successToastTxt}
                onDismiss={() => setSuccessToastTxt('')}
            />
            <Toast
                className='bg-red-500'
                message={errorToastTxt}
                onDismiss={() => setErrorToastTxt('')}
            />
            <ScreenDiv className="py-20 md:px-60 px-3 overflow-y-auto">
                <AnimatePresence
                    onExitComplete={() => router.push(nextRoute)}
                >
                    {shouldShow &&
                        <div className="w-full h-full">
                            <Heading>
                                {heading}
                            </Heading>
                            <ContactForm
                                submit={mySend}
                                show
                                onError={(txt) => setErrorToastTxt(txt)}
                            />
                        </div>
                    }
                </AnimatePresence>
            </ScreenDiv>
        </>
    );
}

export default Contact;
