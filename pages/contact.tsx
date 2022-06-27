import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Form, Formik, FormikHelpers } from "formik";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import Button from "../components/Button";
import NavBar from "../components/NavBar";
import Toast from "../components/Toast";
import submit from "../domain/contact/api/submit";
import validate from "../domain/contact/api/validate";
import i18n from "../domain/contact/i18n";
import TextField from "../domain/contact/TextField/TextField";
import { FormValues } from "../domain/contact/types";
import useI18n from "../hooks/useI18n";
import useTailwindSize from "../hooks/useTailwindSize";
import useToastText from "../hooks/useToastText";

const initialValues: FormValues = {
  message: "",
  name: "",
};

const Contact = () => {
  const [isHuman, setIsHuman] = useState(false);
  const router = useRouter();

  const [nextRoute, setNextRoute] = useState(router.pathname);

  const i = useI18n(i18n);

  const shouldStay = router.pathname === nextRoute;

  const [errorProps, setErrorText] = useToastText({
    props: {
      className: "bg-red-500",
    },
  });
  const [successProps, setSuccessText] = useToastText({
    props: {
      className: "bg-green-500",
    },
  });

  const mySubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await submit(values);

      setSuccessText(i.successMessage);
      resetForm();
    } catch {
      setErrorText(i.submitErrorMessage);
    }
  };

  const { isLg } = useTailwindSize();

  return (
    <>
      <Head>
        <title>{i.title}</title>
        <meta name="description" content={i.description} />
      </Head>
      <Toast {...errorProps} />
      <Toast {...successProps} />
      <NavBar onClick={(route) => setNextRoute(route)} />
      <AnimatePresence onExitComplete={() => router.push(nextRoute)}>
        {shouldStay && (
          <Formik
            initialValues={initialValues}
            onSubmit={mySubmit}
            validate={(values: FormValues) =>
              validate(values, i.validationErrors)
            }
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col justify-center text-center">
                <h1 className="m-9 ">{i.heading}</h1>
                <TextField name="name" placeholder={i.namePlaceholder} />
                <TextField name="email" placeholder={i.emailPlaceholder} />
                <TextField
                  name="message"
                  placeholder={i.messagePlaceholder}
                  isTextarea
                />
                <div className="flex flex-row justify-center m-3 p-3 flex-wrap">
                  <HCaptcha
                    size={isLg ? "normal" : "compact"}
                    sitekey="481c19fe-6f80-4feb-81c5-3c48a90ae625"
                    onVerify={() => setIsHuman(true)}
                    onError={() => {
                      setIsHuman(false);
                      setErrorText(i.captchaErrorText);
                    }}
                    onExpire={() => {
                      setIsHuman(false);
                      setErrorText(i.captchaErrorText);
                    }}
                  />
                  <div className="w-4" />
                  <Button disabled={!isHuman || isSubmitting}>
                    {i.submitText}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </AnimatePresence>
      <div className="h-32" />
    </>
  );
};

export default Contact;
