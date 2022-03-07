import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

import NavBar from '../components/NavBar';
import ScreenDiv from '../components/ScreenDiv';
import Toast from "../components/Toast";
import { ContactForm, Title } from "../domain/contact";
import send from '../domain/contact/api/send';
import i18n from "../domain/contact/i18n";
import useI18n from "../hooks/useI18n";

const Contact = () => {
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const router = useRouter();
    const [nextRoute, setNextRoute] = useState(router.pathname);

    const {
        title,
        errorMessage,
        successMessage,
    } = useI18n(i18n)

    useEffect(() => {
        let time = setTimeout(() => {
            if (showErrorToast) setShowErrorToast(false);
            if (showSuccessToast) setShowSuccessToast(false);
        }, 5000);
        return () => clearTimeout(time)
    }, [showErrorToast, showSuccessToast]);


    const mySend = (data, formik) => {
        send(
            data,
            formik,
            () => { setShowSuccessToast(true) },
            () => { setShowErrorToast(true) }
        );
    }

    const shouldShow = router.pathname === nextRoute;

    return (
        <>
            <NavBar
                onClick={(route) => setNextRoute(route)}
            />
            <Toast
                className='bg-green-500'
                message={successMessage}
                show={showSuccessToast && shouldShow}
                onDismiss={() => setShowSuccessToast(false)}
            />
            <Toast
                className='bg-red-500'
                message={errorMessage}
                show={showErrorToast && shouldShow}
                onDismiss={() => setShowErrorToast(false)}
            />
            <ScreenDiv className="py-16 md:px-60 px-3">
                <AnimatePresence
                    onExitComplete={() => router.push(nextRoute)}
                >
                    {shouldShow &&
                        <div className="w-full h-full">
                            <Title>
                                {title}
                            </Title>
                            <ContactForm
                                submit={mySend}
                                show
                            />
                        </div>
                    }
                </AnimatePresence>
            </ScreenDiv>
        </>
    );
}

export default Contact;
