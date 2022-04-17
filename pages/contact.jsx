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
import useToastText from '../hooks/useToastText';

const Contact = () => {
    const router = useRouter();
    const [nextRoute, setNextRoute] = useState(router.pathname);

    const errorToast = useToastText({ props: { className: 'background-red-500' } });
    const successToast = useToastText({ props: { className: 'background-green-500' } });

    const {
        heading,
        title,
        errorMessage,
        successMessage,
        metaDescription
    } = useI18n(i18n)

    const mySend = (data, formik) => {
        send(
            data,
            formik,
            () => { successToast.setText(successMessage) },
            () => { errorToast.setText(errorMessage) }
        );
    }

    const shouldShow = router.pathname === nextRoute;

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
            <Toast {...errorToast.props} />
            <Toast {...successToast.props} />
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
