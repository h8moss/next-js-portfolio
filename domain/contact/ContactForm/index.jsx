import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

import useI18n from "../../../hooks/useI18n";
import useUser from "../../../hooks/useUser";
import validate from '../api/validate';
import i18n from "../i18n";
import ContactErrorMessage from "./ContactErrorMessage";
import FieldMotion from "./FieldMotion";
import Label from './Label';
import style from './style.module.css';

const verifyCaptcha = async (token, eKey) => {
    const response = await fetch
}

const ContactForm = ({ submit, show = true, onError = () => { } }) => {

    const user = useUser();
    let mail = user !== null ? user.mail : '';

    const {
        emailQuestion,
        messageQuestion,
        nameQuestion,
        optionalText,
        submitButton
    } = useI18n(i18n);

    const [isHuman, setIsHuman] = useState(false);
    const captchaRef = useRef(null);

    return (
        <Formik
            initialValues={{
                name: '',
                email: mail,
                message: '',
            }}
            validate={validate}
            onSubmit={() => {
                captchaRef.current.resetCaptcha();
                setIsHuman(false);
                submit();
            }}
        >
            {({ isSubmitting, submitForm }) => (
                <Form className={style.form}>
                    <>
                        <Label htmlFor="name" show={show}>
                            {nameQuestion}
                        </Label>
                        <FieldMotion>
                            <Field name="name" type="text" className={style.field + ' w-full'} />
                        </FieldMotion>
                        <motion.div
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ContactErrorMessage name="name" />
                        </motion.div>
                        <Label htmlFor="email" show={show}>
                            {emailQuestion}
                            <span className='text-sm'> {optionalText}
                            </span>
                        </Label>
                        <FieldMotion>
                            <Field name="email" className={style.field} />
                        </FieldMotion>
                        <motion.div
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ContactErrorMessage name="email" />
                        </motion.div>
                        <Label htmlFor="message" show={show}>
                            {messageQuestion}
                        </Label>
                        <FieldMotion className='flex-grow'>
                            <Field
                                name="message"
                                as='textarea'
                                className={style.field + ' h-full'}
                            />
                        </FieldMotion>
                        <motion.div
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ContactErrorMessage name="message" />
                        </motion.div>
                        <motion.div className="mx-auto py-4"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <HCaptcha
                                sitekey="481c19fe-6f80-4feb-81c5-3c48a90ae625"
                                onVerify={verifyCaptcha}
                                onError={() => {
                                    onError('Something went wrong');
                                    setIsHuman(false);
                                }}

                                ref={captchaRef}

                                onExpire={() => {
                                    onError('Captcha expired');
                                    setIsHuman(false);
                                }}
                            />
                        </motion.div>
                        <div className="flex md:flex-row flex-col justify-center">
                            <motion.button
                                whileHover={{ scale: isSubmitting || !isHuman ? 1 : 1.2 }}
                                initial={{ x: '10vh', opacity: 0 }}
                                exit={{ x: '100vw', opacity: 0 }}
                                animate={{ x: '0', opacity: 1 }}
                                className={`w-min my-auto rounded-lg ${isSubmitting || !isHuman ? "bg-gray-400" : 'bg-purple-400'} p-3`}
                                onClick={() => {
                                    if (!isSubmitting && isHuman) {
                                        submitForm();
                                    }
                                }}
                                disabled={isSubmitting || !isHuman}
                            >
                                {submitButton}
                            </motion.button>
                            <motion.p
                                className="my-auto ml-5 mr-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                or email me at
                            </motion.p>
                            <motion.a
                                className="my-auto w-min text-purple-300 hover:underline"
                                href="mailto:h8mosscontact@gmail.com"
                                target='_blank'
                                rel='noreferrer'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                h8mosscontact@gmail.com
                            </motion.a>
                        </div>
                    </>
                </Form>
            )
            }
        </Formik >
    )
}


export default ContactForm;